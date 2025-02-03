import { clone, getRemoteInfo2 } from "isomorphic-git";
import http from "isomorphic-git/http/web";
import { fs } from "../../fs/fs";

const corsProxy = "https://cors.isomorphic-git.org";

export async function getRemoteInfo(
  params: Omit<Parameters<typeof getRemoteInfo2>[0], "http" | "corsProxy">
) {
  return getRemoteInfo2({
    http,
    corsProxy: !params.url?.match(/^https?:\/\/localhost/) // for tests, mainly
      ? corsProxy
      : undefined,
    ...params,
  });
}

export async function cloneRepo(
  params: Omit<Parameters<typeof clone>[0], "fs" | "http" | "corsProxy">
) {
  await clone({
    singleBranch: true,
    fs,
    http,
    corsProxy,
    ...params,
  });
}
