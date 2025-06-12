import { useState, useEffect } from 'react';
import { GitHubService } from '@/services/githubService';

interface GitHubStats {
  stars: string;
  forks: string;
  loading: boolean;
  error: boolean;
}

export function useGitHubRepo(githubUrl: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    stars: '0',
    forks: '0',
    loading: true,
    error: false
  });

  useEffect(() => {
    let mounted = true;

    const fetchRepoData = async () => {
      if (!githubUrl) {
        if (mounted) {
          setStats(prev => ({ ...prev, loading: false, error: true }));
        }
        return;
      }

      try {
        const repoName = GitHubService.extractRepoNameFromUrl(githubUrl);
        if (!repoName) {
          if (mounted) {
            setStats(prev => ({ ...prev, loading: false, error: true }));
          }
          return;
        }

        const repo = await GitHubService.getRepository(repoName);
        
        if (mounted) {
          if (repo) {
            setStats({
              stars: repo.stargazers_count.toString(),
              forks: repo.forks_count.toString(),
              loading: false,
              error: false
            });
          } else {
            setStats(prev => ({ ...prev, loading: false, error: true }));
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        if (mounted) {
          setStats(prev => ({ ...prev, loading: false, error: true }));
        }
      }
    };

    // Clear previous data and show loading state
    setStats(prev => ({ ...prev, loading: true }));
    fetchRepoData();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [githubUrl]);

  return stats;
}

export function useMultipleGitHubRepos(repos: Array<{ url: string; fallbackStars?: string; fallbackForks?: string }>) {
  const [reposData, setReposData] = useState<Array<GitHubStats>>(
    repos.map(() => ({
      stars: '0',
      forks: '0',
      loading: true,
      error: false
    }))
  );

  useEffect(() => {
    let mounted = true;

    const fetchAllRepos = async () => {
      // Show loading state for all repos
      if (mounted) {
        setReposData(prev => prev.map(() => ({
          stars: '0',
          forks: '0',
          loading: true,
          error: false
        })));
      }

      try {
        const repoNames = repos.map(repo => GitHubService.extractRepoNameFromUrl(repo.url));
        const reposResponse = await GitHubService.getMultipleRepositories(repoNames);
        
        if (mounted) {
          const statsArray = reposResponse.map((repo, index) => {
            if (repo) {
              return {
                stars: repo.stargazers_count.toString(),
                forks: repo.forks_count.toString(),
                loading: false,
                error: false
              };
            } else {
              // Use fallback data if API fails
              return {
                stars: repos[index].fallbackStars || '0',
                forks: repos[index].fallbackForks || '0',
                loading: false,
                error: true
              };
            }
          });
          
          setReposData(statsArray);
        }
      } catch (error) {
        console.error('Error fetching multiple repos:', error);
        if (mounted) {
          // Set fallback data for all repos on error
          setReposData(repos.map(repo => ({
            stars: repo.fallbackStars || '0',
            forks: repo.fallbackForks || '0',
            loading: false,
            error: true
          })));
        }
      }
    };

    if (repos.length > 0) {
      fetchAllRepos();
    }

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [repos]);

  return reposData;
}
