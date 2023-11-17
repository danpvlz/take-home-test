export interface Commit {
    message: string;
    committer: Committer;
}

export interface Committer {
    date: string;
}

export interface CommitAuthor {
    login: string;
    avatar_url: string;
}

export interface GitHubCommit {
    sha: string;
    commit: Commit;
    author: CommitAuthor;
    html_url: string;
}

export interface GitHubRepository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    owner: Owner;
}

export interface Owner {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
}