import { clone } from "isomorphic-git";
import { fs } from "../../fs/fs";
import http from "isomorphic-git/http/web";

export async function cloneRepo({
  dir,
  url,
  onProgress,
}: Pick<Parameters<typeof clone>[0], "url" | "dir" | "onProgress">) {
  await clone({
    fs,
    url,
    http,
    corsProxy: "https://cors.isomorphic-git.org",
    dir,
    onProgress,
    singleBranch: true,
  });
}
