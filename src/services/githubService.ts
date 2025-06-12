import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

interface CacheEntry {
  data: any;
  timestamp: number;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  html_url: string;
}

interface GitHubApiResponse {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  html_url: string;
}

class GitHubService {
  private static cache: Map<string, CacheEntry> = new Map();

  static extractRepoNameFromUrl(url: string): string | null {
    try {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        return `${match[1]}/${match[2]}`;
      }
      return null;
    } catch (error) {
      console.error('Error extracting repo name:', error);
      return null;
    }
  }

  private static isCacheValid(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    return Date.now() - entry.timestamp < CACHE_DURATION;
  }

  private static async fetchWithCache(endpoint: string) {
    const cacheKey = endpoint;
    
    // Return cached data if valid
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)?.data;
    }

    try {
      const response = await axios.get(`${GITHUB_API_BASE}${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });

      // Cache the response
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });

      return response.data;
    } catch (error) {
      console.error('GitHub API Error:', error);
      throw error;
    }
  }

  static async getRepository(repoName: string) {
    try {
      return await this.fetchWithCache(`/repos/${repoName}`);
    } catch (error) {
      console.error(`Error fetching repo ${repoName}:`, error);
      return null;
    }
  }

  static async getMultipleRepositories(repoNames: (string | null)[]) {
    try {
      // Filter out null values and fetch in parallel
      const validRepoNames = repoNames.filter((name): name is string => name !== null);
      const promises = validRepoNames.map(repoName => 
        this.fetchWithCache(`/repos/${repoName}`)
      );
      
      const results = await Promise.allSettled(promises);
      
      return results.map(result => 
        result.status === 'fulfilled' ? result.value : null
      );
    } catch (error) {
      console.error('Error fetching multiple repos:', error);
      return repoNames.map(() => null);
    }
  }

  // Clear cache manually if needed
  static clearCache() {
    this.cache.clear();
  }
}

export { GitHubService };
