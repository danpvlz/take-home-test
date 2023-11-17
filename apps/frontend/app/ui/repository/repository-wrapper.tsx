import React from "react";
import { fetchRepository } from "../../lib/data";
import RepositoryCard from "./repository-card";
import ErrorMessage from "../error-message";

export default async function RepositoryWrapper() {
  const { success, data: repository, error } = await fetchRepository();

  if (!success) return <ErrorMessage error={error} />;

  return (
    <div>
      {repository ? (
        <RepositoryCard repository={repository} />
      ) : (
        <p className="font-mono">No repository info</p>
      )}
    </div>
  );
}
