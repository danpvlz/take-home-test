import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '@backend/github-api/github-api.router'

export const gitHubApi = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_NESTJS_BACKEND}/github`,
    }),
  ],
});