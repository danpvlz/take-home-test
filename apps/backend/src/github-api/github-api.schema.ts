import { z } from 'zod';

export const CommitAuthorSchema = z.object({
  date: z.string(),
  email: z.string(),
  name: z.string(),
});

export const CommitSchema = z.object({
  author: CommitAuthorSchema,
  message: z.string(),
});

export const CommitterSchema = z.object({
  id: z.number(),
  avatar_url: z.string(),
});

export const GitHubCommitSchema = z.object({
  sha: z.string(),
  committer: CommitterSchema,
  commit: CommitSchema,
});

export const GitHubReponseSchema = z.array(GitHubCommitSchema);