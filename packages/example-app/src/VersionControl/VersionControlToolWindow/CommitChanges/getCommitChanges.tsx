import git from "isomorphic-git";
import path from "path";

import { Change, Revision } from "../../Changes/Change";

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
  Change[]
> {
  let items: Change[] = await git.walk({
    ...params,
    cache,
    trees: [git.TREE({ ref: fromRef }), git.TREE({ ref: toRef })],
    map: async function map(
      filepath,
      [before, after]
    ): Promise<null | boolean | Change> {
      const afterOid = await after?.oid();
      const beforeOid = await before?.oid();
      const afterType = await after?.type();
      const beforeType = await before?.type();
      if (afterOid === beforeOid) {
        return null;
      }
      const afterRevision: Revision = {
        hash: await after?.oid(),
        path: path.join(params.dir || "", filepath),
        isDir: afterType === "tree",
        content: async () =>
          new TextDecoder().decode(
            (await after?.content()) ?? new Uint8Array()
          ),
      };
      const beforeRevision: Revision = {
        hash: await before?.oid(),
        path: path.join(params.dir || "" || "", filepath),
        isDir: beforeType === "tree",
        content: async () =>
          new TextDecoder().decode(
            (await before?.content()) ?? new Uint8Array()
          ),
      };
      const type = afterType ?? beforeType;
      return (
        type === "blob" && {
          ...(afterOid ? { after: afterRevision } : null),
          ...(beforeOid ? { before: beforeRevision } : null),
        }
      );
    },
  });

  return (items || []).filter((item: boolean | Change) => item);
}
