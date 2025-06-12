
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

export class GitHubService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly USERNAME = 'cryptoking-max';

  static async getRepository(repoName: string): Promise<GitHubRepo | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/repos/${this.USERNAME}/${repoName}`);
      
      if (!response.ok) {
        console.warn(`Failed to fetch repo ${repoName}:`, response.status);
        return null;
      }
      
      const data: GitHubApiResponse = await response.json();
      
      return {
        name: data.name,
        description: data.description || '',
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        language: data.language || 'Unknown',
        topics: data.topics || [],
        html_url: data.html_url
      };
    } catch (error) {
      console.error(`Error fetching repository ${repoName}:`, error);
      return null;
    }
  }

  static async getMultipleRepositories(repoNames: string[]): Promise<(GitHubRepo | null)[]> {
    const promises = repoNames.map(repoName => this.getRepository(repoName));
    return Promise.all(promises);
  }

  static extractRepoNameFromUrl(githubUrl: string): string {
    const match = githubUrl.match(/github\.com\/[^\/]+\/([^\/]+)/);
    return match ? match[1] : '';
  }
}
