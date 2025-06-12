
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
    if (!githubUrl) {
      setStats(prev => ({ ...prev, loading: false, error: true }));
      return;
    }

    const fetchRepoData = async () => {
      try {
        const repoName = GitHubService.extractRepoNameFromUrl(githubUrl);
        if (!repoName) {
          setStats(prev => ({ ...prev, loading: false, error: true }));
          return;
        }

        const repo = await GitHubService.getRepository(repoName);
        
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
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchRepoData();
  }, [githubUrl]);

  return stats;
}

export function useMultipleGitHubRepos(repos: Array<{ url: string; fallbackStars?: string; fallbackForks?: string }>) {
  const [reposData, setReposData] = useState<Array<GitHubStats>>([]);

  useEffect(() => {
    const fetchAllRepos = async () => {
      const repoNames = repos.map(repo => GitHubService.extractRepoNameFromUrl(repo.url));
      const reposResponse = await GitHubService.getMultipleRepositories(repoNames);
      
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
    };

    if (repos.length > 0) {
      fetchAllRepos();
    }
  }, [repos]);

  return reposData;
}
