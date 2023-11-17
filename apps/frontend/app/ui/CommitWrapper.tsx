import { fetchCommits } from "../lib/data";
import { CommitCard } from "./CommitCard";

export default async function CommitWrapper() {
  const commits = await fetchCommits()

  return (
    <>
      {commits.map((commit) => (
        <CommitCard key={commit.sha} commit={commit} />
      ))}
    </>
  );
}