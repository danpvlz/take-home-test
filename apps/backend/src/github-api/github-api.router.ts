import { INestApplication, Injectable } from '@nestjs/common';
import { GitHubService } from '@backend/github-api/github-api.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { GitHubCommit } from './github-api.interfaces';
import { GitHubReponseSchema } from './github-api.schema';

@Injectable()
export class GitHubApiRouter {
  constructor(private readonly trpc: GitHubService) {}

  githubRouter = this.trpc.router({
    getGitHubCommits: this.trpc.procedure.query(async (): Promise<GitHubCommit[]> => {
      try {
        const response = await fetch("https://api.github.com/repos/danpvlz/take-home-test/commits", {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}` // Use environment variable
          }
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