import { localRepository } from '../data';
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
        expect(repositoryInfo).toMatchObject(localRepository)
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
