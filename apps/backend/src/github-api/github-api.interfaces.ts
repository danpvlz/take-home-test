export interface GitHubCommit {
    sha: string;
    committer: Committer;
    commit: Commit;
}

export interface Committer {
    id: number;
    avatar_url: string;
}

export interface Commit {
    author: CommitAuthor;
    message: string;
}

export interface CommitAuthor {
    date: string;
    email: string;
    name: string;
}