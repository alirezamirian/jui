import git from "isomorphic-git";
import path from "path";

import { AnyChange, Change, Revision } from "../../Changes/Change";

const cache = {}; // FIXME: find a better caching strategy. Per project?
export async function getCommitChanges({
  fromRef,
  toRef,
  ...params
}: {
  dir?: string;
  gitdir?: string;
  fromRef: string;
  toRef: string;
} & Pick<Parameters<typeof git["walk"]>[0], "fs" | "dir" | "gitdir">): Promise<
  AnyChange[]
> {
  let items: AnyChange[] = await git.walk({
    ...params,
    cache,
    trees: [git.TREE({ ref: fromRef }), git.TREE({ ref: toRef })],
    map: async function map(
      filepath,
      [before, after]
    ): Promise<null | boolean | AnyChange> {
      const afterOid = await after?.oid();
      const beforeOid = await before?.oid();
      const afterType = await after?.type();
      const beforeType = await before?.type();
      if (afterOid === beforeOid) {
        return null;
      }
      const afterRevision: Revision | null = afterOid
        ? {
            hash: afterOid,
            path: path.join(params.dir || "", filepath),
            isDir: afterType === "tree",
            content: async () =>
              new TextDecoder().decode(
                (await after?.content()) ?? new Uint8Array()
              ),
          }
        : null;
      const beforeRevision: Revision | null = beforeOid
        ? {
            hash: beforeOid,
            path: path.join(params.dir || "" || "", filepath),
            isDir: beforeType === "tree",
            content: async () =>
              new TextDecoder().decode(
                (await before?.content()) ?? new Uint8Array()
              ),
          }
        : null;
      const change: AnyChange | null =
        afterRevision || beforeRevision
          ? // @ts-expect-error ts can't tell that the signature matches
            Change(beforeRevision, afterRevision)
          : null;
      return change && !Change.revision(change).isDir
        ? change
        : // returning null will cause the git.walk not to continue traversing the tree
          false;
    },
  });

  return (items || []).filter((item: boolean | AnyChange) => item);
}
