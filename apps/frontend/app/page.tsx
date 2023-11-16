"use client";

import { useEffect, useState } from "react";
import { gitHubApi } from "./gitHubApi";
import { GitHubCommit } from "@backend/github-api/github-api.interfaces";

export default function Home() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);

  useEffect(() => {
    gitHubApi.getGitHubCommits
      .query()
      .then((response) => setCommits(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        {
          commits.map(commit=><div key={commit.sha} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">{commit.commit.message}</div>)
        }
      </div>
    </main>
  );
}
