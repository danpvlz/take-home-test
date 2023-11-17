import React, { Suspense } from "react";
import { RepositoryCardSkeleton } from "./Skeletons";
import RepositoryWrapper from "./Repository/RepositoryWrapper";

export default async function Sidebar() {
  return (
    <div className="w-full md:max-w-xs relative md:sticky md:top-12">
      <Suspense fallback={<RepositoryCardSkeleton />}>
        <RepositoryWrapper />
      </Suspense>
    </div>
  );
}
