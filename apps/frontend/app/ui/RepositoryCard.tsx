import Image from "next/image";
import React from "react";
import { fetchRepository } from "../lib/data";

export default async function RepositoryCard() {
  const repository = await fetchRepository();

  return (
    <div className=" border-neutral-800 bg-zinc-800/40 rounded-xl border p-6 flex flex-col gap-3">
      <a
        className="font-bold text-2xl text-blue-500 hover:text-blue-300 transition-colors duration-150 flex items-center gap-2"
        href={repository?.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {repository?.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h14v-7h2v7q0 .825-.588 1.413T19 21H5Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z"
          />
        </svg>
      </a>
      <p>{repository?.description}</p>

      {repository ? (
        <div className="flex  items-center gap-3 text-xs">
          <p>by</p>{" "}
          <Image
            className="rounded-full"
            src={repository?.owner.avatar_url}
            width={20}
            height={20}
            alt={`${repository?.owner.login} avatar`}
          />
          <p>{repository?.owner.login}</p>
        </div>
      ) : null}
    </div>
  );
}
