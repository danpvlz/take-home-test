import { fetchCommits } from "../../lib/data";
import ErrorMessage from "../error-message";
import { CommitCard } from "./commit-card";

export default async function CommitWrapper() {
  const { success, data: commits, error } = await fetchCommits();

  if (!success) return <ErrorMessage error={error} />;

  return (
    <>
      {commits.length === 0 ? (
        <p className="font-mono">No commits</p>
      ) : (
        commits.map((commit) => <CommitCard key={commit.sha} commit={commit} />)
      )}
    </>
  );
}
