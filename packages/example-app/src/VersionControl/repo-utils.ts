import { basename } from "path";

// TODO: implement properly based on DvcsUtil#getShortRepositoryName
export function getShortRepositoryName(vcsRoot: { dir: string }) {
  return basename(vcsRoot.dir);
}
