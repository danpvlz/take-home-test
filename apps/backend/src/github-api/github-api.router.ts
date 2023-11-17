import { INestApplication, Injectable } from '@nestjs/common';
import { GitHubService } from '@backend/github-api/github-api.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { GitHubCommit, GitHubRepository } from './github-api.interfaces';
import { GitHubReponseSchema, GitHubRepositorySchema } from './github-api.schema';

@Injectable()
export class GitHubApiRouter {
  private owner: string;
  private repository: string;

  constructor(private readonly trpc: GitHubService) {
    this.owner = 'danpvlz'
    this.repository = 'take-home-test'
  }

  githubRouter = this.trpc.router({
    getGitHubCommits: this.trpc.procedure
    .query(async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repository}/commits`, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
          },
        });

        if (response.ok) {
          const data: GitHubCommit[] = await response.json();
          return GitHubReponseSchema.parse(data);
        }
        
        // Handle non-OK responses
        console.error(`GitHub API error: ${response.statusText}`);
        return [];
      } catch (err) {
        // Handle fetch errors
        console.error(`Fetch error: ${err}`);
        return [];
      }
    }),
    getGitHubRepository: this.trpc.procedure
    .query(async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repository}`, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
          },
        });

        if (response.ok) {
          const data: GitHubRepository = await response.json();
          return GitHubRepositorySchema.parse(data);
        }
        
        // Handle non-OK responses
        console.error(`GitHub API error: ${response.statusText}`);
        return null;
      } catch (err) {
        // Handle fetch errors
        console.error(`Fetch error: ${err}`);
        return null;
      }
    }),
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