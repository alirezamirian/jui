import { status as getStatus } from "isomorphic-git";
import { StatusRow } from "isomorphic-git";

// platform/editor-ui-api/src/com/intellij/openapi/vcs/FileStatus.java
export type FileStatus =
  | "UNKNOWN"
  | "ADDED"
  | "NOT_CHANGED"
  | "MODIFIED"
  | "DELETED";

// platform/vcs-api/src/com/intellij/openapi/vcs/VcsDirectoryMapping.java
export interface VcsDirectoryMapping {
  dir: string;
  vcs: "git"; // only supported vcs for now.
}

// TODO: remove when upgraded TS to >=4.5
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Converts isomorphic-git status string or StatusRow to FileStatus.
 *
 * for status row:
 *   ["a.txt", 0, 2, 0], // new, untracked
 *   ["b.txt", 0, 2, 2], // added, staged
 *   ["c.txt", 0, 2, 3], // added, staged, with unstaged changes
 *   ["d.txt", 1, 1, 1], // unmodified
 *   ["e.txt", 1, 2, 1], // modified, unstaged
 *   ["f.txt", 1, 2, 2], // modified, staged
 *   ["g.txt", 1, 2, 3], // modified, staged, with unstaged changes
 *   ["h.txt", 1, 0, 1], // deleted, unstaged
 *   ["i.txt", 1, 0, 0], // deleted, staged
 *
 * for status:
 *   | status                | description                                                                           |
 * | --------------------- | ------------------------------------------------------------------------------------- |
 * | `"ignored"`           | file ignored by a .gitignore rule                                                     |
 * | `"unmodified"`        | file unchanged from HEAD commit                                                       |
 * | `"*modified"`         | file has modifications, not yet staged                                                |
 * | `"*deleted"`          | file has been removed, but the removal is not yet staged                              |
 * | `"*added"`            | file is untracked, not yet staged                                                     |
 * | `"absent"`            | file not present in HEAD commit, staging area, or working dir                         |
 * | `"modified"`          | file has modifications, staged                                                        |
 * | `"deleted"`           | file has been removed, staged                                                         |
 * | `"added"`             | previously untracked file, staged                                                     |
 * | `"*unmodified"`       | working dir and HEAD commit match, but index differs                                  |
 * | `"*absent"`           | file not present in working dir or HEAD commit, but present in the index              |
 * | `"*undeleted"`        | file was deleted from the index, but is still in the working dir                      |
 * | `"*undeletemodified"` | file was deleted from the index, but is present with modifications in the working dir |
 */
export function convertGitStatus(
  status: Awaited<ReturnType<typeof getStatus>> | StatusRow
): FileStatus {
  // TODO: complete and refine this logic.
  if (Array.isArray(status)) {
    if (status[1] === 1) {
      return (["DELETED", "NOT_CHANGED", "MODIFIED"] as const)[status[2]];
    }
    if (status[1] === 0) {
      if (status[3] === 0) {
        return "UNKNOWN";
      } else {
        return "ADDED";
      }
    }
    return "UNKNOWN";
  }
  if (status === "modified" || status === "*modified") {
    return "MODIFIED";
  }
  if (status === "deleted" || status === "*deleted") {
    return "DELETED";
  }
  if (status === "added") {
    return "ADDED";
  }
  if (status === "unmodified") {
    return "NOT_CHANGED";
  }
  return "UNKNOWN";
}
