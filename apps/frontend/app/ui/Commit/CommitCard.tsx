import { GitHubCommit } from "@backend/github-api/github-api.interfaces";
import moment from "moment";
import Image from "next/image";

export function CommitCard({ commit }: { commit: GitHubCommit }) {
  const getTitle = () => {
    const title = commit.commit.message.split("\n")[0];

    if (!title) return null;

    return <p className="text-blue-400">{title}</p>;
  };

  const getCommitBody = () => {
    const body = commit.commit.message.split("\n")?.slice(1)?.join("\n");

    if (!body) return null;

    return <p className="text-slate-300 ">{body}</p>;
  };

  return (
    <div
      key={commit.sha}
      className="whitespace-pre-line w-full 
            backdrop-blur-2xl 
            border-neutral-800 bg-zinc-800/40 rounded-xl border p-6 flex flex-col gap-3"
      data-cy="commit-card"
    >
      <div className="w-full flex justify-between items-start">
        <div className="flex  items-center gap-3">
          <Image
            className="rounded-full"
            src={commit.author.avatar_url}
            width={30}
            height={30}
            alt={`${commit.author.login} avatar`}
          />
          <p>
            {commit.author.login}{" "}
            <span className="opacity-40">
              committed{" "}
              {moment(commit.commit.committer.date)
                .calendar()
                .toLocaleLowerCase()}
            </span>
          </p>
        </div>

        <a
          href={commit.html_url}
          target="_blank"
          rel="noreferrer"
          role="link"
          aria-label="Open commit on GitHub"
          className="opacity-60 hover:opacity-80 transition-opacity duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h14v-7h2v7q0 .825-.588 1.413T19 21H5Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z"
            />
          </svg>
        </a>
      </div>
      {getTitle()}
      {getCommitBody()}
    </div>
  );
}
