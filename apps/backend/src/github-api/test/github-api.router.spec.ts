import { GitHubApiError } from '../github-api.errors';
import { GitHubApiRouter } from '../github-api.router';
import { GitHubService } from '../github-api.service';

describe('GitHubApiRouter', () => {
    let githubApiRouter: GitHubApiRouter;
    let githubServiceMock: GitHubService;

    beforeEach(() => {
        githubServiceMock = new GitHubService();
        githubApiRouter = new GitHubApiRouter(githubServiceMock);
    });
    
    it('should fetch repository information', async () => {
        const repositoryInfo = await githubApiRouter.fetchRepositoryInformation();

        expect(repositoryInfo).toBeDefined();
        expect(repositoryInfo).toMatchObject({
          name: 'take-home-test',
          description: 'Monorepo showcasing a take-home test project using Next.js for the frontend and Nest.js for the backend',
          html_url: 'https://github.com/danpvlz/take-home-test',
          owner: {
            avatar_url: 'https://avatars.githubusercontent.com/u/55776282?v=4',
            login: 'danpvlz',
          }
        })
    });

    it('should fetch commits', async () => {
        const commits = await githubApiRouter.fetchCommits();

        expect(commits).toBeDefined();
        expect(commits).toBeInstanceOf(Array);
        expect(commits.length).toBeGreaterThan(0)
        expect(commits[0]).toMatchObject({
            sha: expect.any(String),
            commit: expect.any(Object),
            author: expect.any(Object),
            html_url: expect.any(String),
          });
    });

    it('should handle errors when fetching repository information', async () => {
        process.env.GITHUB_TOKEN = undefined;
        
        try {
            const repositoryInfo = await githubApiRouter.fetchRepositoryInformation();
            expect(repositoryInfo).toBeNull();
          } catch (error) {
            expect(error).toBeInstanceOf(GitHubApiError);
            expect(error.status).toBe(401);
            expect(error.message).toBe('GitHub API error: 401 - Unauthorized');
          }
    });
    
    it('should handle errors when fetching commits', async () => {
        process.env.GITHUB_TOKEN = undefined;
        
        try {
            const commits = await githubApiRouter.fetchCommits();
            expect(commits).toBeNull();
          } catch (error) {
            expect(error).toBeInstanceOf(GitHubApiError);
            expect(error.status).toBe(401);
            expect(error.message).toBe('GitHub API error: 401 - Unauthorized');
          }
    });
});
