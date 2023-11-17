import { gitHubApi } from "../gitHubApi";

export async function fetchCommits() {
    try {
        const commits = await gitHubApi.getGitHubCommits.query();
        return { success: true, data: commits }
    } catch (error) {
        return { success: false, data: [], error: 'Failed to fetch commits.' }
    }
}

export async function fetchRepository() {
    try {
        const repository = await gitHubApi.getGitHubRepository.query();
        return { success: true, data: repository }
    } catch (error) {
        return { success: false, data: null, error: 'Failed to fetch repository.' }
    }
}