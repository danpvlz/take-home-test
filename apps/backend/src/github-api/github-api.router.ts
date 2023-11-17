import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { GitHubCommit, GitHubRepository } from './github-api.interfaces';
import { GitHubReponseSchema, GitHubRepositorySchema } from './github-api.schema';
import { GitHubService } from './github-api.service';
import { GitHubApiError } from './github-api.errors';

@Injectable()
export class GitHubApiRouter {
  private owner: string;
  private repository: string;

  constructor(private readonly trpc: GitHubService) {
    this.owner = 'danpvlz'
    this.repository = 'take-home-test'
  }

  async fetchRepositoryInformation(): Promise<GitHubRepository> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repository}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
      });

      if (!response.ok) {
        throw new GitHubApiError(`GitHub API error: ${response.status} - ${response.statusText}`, response.status);
      }

      const data: GitHubRepository = await response.json();
      return GitHubRepositorySchema.parse(data);
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error;
      } else {
        throw new GitHubApiError('Internal Server Error', 500);
      }
    }
  }

  async fetchCommits(): Promise<GitHubCommit[]> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repository}/commits`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
      });

      if (!response.ok) {
        throw new GitHubApiError(`GitHub API error: ${response.status} - ${response.statusText}`, response.status);
      }

      const data: GitHubCommit[] = await response.json();
      return GitHubReponseSchema.parse(data);
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error;
      } else {
        throw new GitHubApiError('Internal Server Error', 500);
      }
    }
  }

  githubRouter = this.trpc.router({
    getGitHubCommits: this.trpc.procedure.query(async () => this.fetchCommits()),
    getGitHubRepository: this.trpc.procedure.query(async () => this.fetchRepositoryInformation()),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/github`,
      trpcExpress.createExpressMiddleware({
        router: this.githubRouter,
      }),
    );
  }
}

export type AppRouter = GitHubApiRouter['githubRouter'];