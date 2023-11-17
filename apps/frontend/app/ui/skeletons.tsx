const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CommitCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-zinc-900 shadow-sm border border-neutral-700 p-6 flex flex-col w-full gap-4`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-zinc-700" />
          <div className="ml-2 h-6 w-80 rounded-md bg-zinc-700 text-sm font-medium" />
        </div>
          <div className="h-5 w-5 rounded-md bg-zinc-700" />
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 ">
        <div className="h-4 w-full rounded-md bg-zinc-700" />
        <div className="h-4 w-full rounded-md bg-zinc-700" />
        <div className="h-4 w-full rounded-md bg-zinc-700" />
      </div>
    </div>
  );
}

export function CommitCardsSkeleton() {
  return (
    <>
      <CommitCardSkeleton />
      <CommitCardSkeleton />
      <CommitCardSkeleton />
      <CommitCardSkeleton />
    </>
  );
}

export function RepositoryCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-zinc-900 p-2 shadow-sm w-full flex flex-col gap-4 items-center justify-center px-4 py-8 border border-neutral-700`}
    >
      <div className="flex w-full gap-2">
        <div className="h-6 w-full rounded-md bg-zinc-700" />
        <div className="h-6 w-8 rounded-md bg-zinc-700" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-2 w-full rounded-md bg-zinc-700" />
        <div className="h-2 w-full rounded-md bg-zinc-700" />
        <div className="h-2 w-full rounded-md bg-zinc-700" />
      </div>
      <div className="flex w-full gap-2 items-center">
        <div className="h-3 w-6 rounded-md bg-zinc-700" />
        <div className="h-6 w-6 rounded-full aspect-square bg-zinc-700" />
        <div className="h-3 w-20 rounded-md bg-zinc-700" />
      </div>
    </div>
  );
}
