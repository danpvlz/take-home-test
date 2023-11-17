import { z } from 'zod';

export const CommitterSchema = z.object({
  date: z.string(),
});

export const CommitSchema = z.object({
  message: z.string(),
  committer: CommitterSchema,
});

export const CommitAuthorSchema = z.object({
  login: z.string(),
  avatar_url: z.string(),
});

export const GitHubCommitSchema = z.object({
  sha: z.string(),
  commit: CommitSchema,
  author: CommitAuthorSchema,
  html_url: z.string(),
});

export const OwnerSchema = z.object({
  id: z.number(),
  avatar_url: z.string(),
  login: z.string(),
  url: z.string(),
});

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  html_url: z.string(),
  owner: OwnerSchema,
});

export const GitHubReponseSchema = z.array(GitHubCommitSchema);