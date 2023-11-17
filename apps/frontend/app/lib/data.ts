import { gitHubApi } from "../gitHubApi";

export async function fetchCommits() {
    try {
        const commits = await gitHubApi.getGitHubCommits.query();
        return commits
    } catch (error) {
        console.error('Error when fetching commits:', error);
        throw new Error('Failed to fetch commits.');
    }
}

export async function fetchRepository(){
    try {
        const repository = await gitHubApi.getGitHubRepository.query();
        return repository
    } catch (error) {
        console.error('Error when fetching repository:', error);
        throw new Error('Failed to fetch repository.');
    }
}