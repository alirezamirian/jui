export type AppGlobals = {
  fs: typeof import("../../../../example-app/src/fs/fs").fs;
  git: typeof import("isomorphic-git");
  path: typeof import("path");
  projectDir: string;
};
