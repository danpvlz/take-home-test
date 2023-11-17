import { Suspense } from "react";
import CommitWrapper from "./ui/CommitWrapper";
import { CommitCardsSkeleton } from "./ui/Skeletons";
import Sidebar from "./ui/Sidebar";

export default async function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen justify-between items-center md:items-start p-10  md:p-24 gap-12">
      <Sidebar />
      <div className="w-full font-mono flex flex-col gap-8">
        <Suspense fallback={<CommitCardsSkeleton />}>
          <CommitWrapper />
        </Suspense>
      </div>
    </main>
  );
}
