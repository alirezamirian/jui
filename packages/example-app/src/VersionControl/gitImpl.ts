import git from "isomorphic-git";
import http from "isomorphic-git/http/web";

import { fs } from "../fs/fs";

type ImplementedGitMethod<T extends keyof typeof git> =
  (typeof git)[T] extends (...args: any[]) => any
    ? (
        params: Omit<Parameters<(typeof git)[T]>[0], "fs" | "cache" | "http">
      ) => ReturnType<(typeof git)[T]>
    : (typeof git)[T];

const cache = {};

// TODO: replace all direct usages of git with this new gitImpl object to abstract away dependencies like fs from
//  the rest of the application.
export const gitImpl: { [key in keyof typeof git]: ImplementedGitMethod<key> } =
  Object.fromEntries(
    Object.entries(git).map(([key, value]) => {
      if (typeof value === "function") {
        return [
          key,
          (...[params, ...args]: Parameters<typeof value>) => {
            return value({ fs, cache, http, ...params } as any, ...args);
          },
        ];
      }
      return [key, value];
    })
  );
