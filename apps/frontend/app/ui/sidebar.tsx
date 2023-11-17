import React, { Suspense } from "react";
import { fetchRepository } from "../lib/data";
import RepositoryCard from "./RepositoryCard";
import { RepositoryCardSkeleton } from "./skeletons";

export default async function Sidebar() {
  return (
    <div className="w-full md:max-w-xs relative md:sticky md:top-12">
      <Suspense fallback={<RepositoryCardSkeleton />}>
        <RepositoryCard />
      </Suspense>
    </div>
  );
}
