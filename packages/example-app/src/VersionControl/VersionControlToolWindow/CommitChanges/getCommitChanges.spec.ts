import * as fs from "fs";
import path from "path";

import { getCommitChanges } from "./getCommitChanges";
import { Change } from "../../Changes/Change";

const repoPath = path.resolve(
  // eslint-disable-next-line no-undef
  __dirname,
  "../../../../fixture/git/diff-example.git"
);

describe("getCommitChanges", () => {
  it("consolidates new and deleted files if the content is more than 50% similar", async () => {
    const changes = await getCommitChanges({
      fs,
      fromRef: "21d19576802af30b349e49ce09ff3201755a2457",
      toRef: "7a4535a30be43ee6a9099ab3f625a3483934de35",
      gitdir: repoPath,
    });
    expect(changes.filter(Change.isModification)).toHaveLength(10);
    expect(changes.filter(Change.isRename)).toHaveLength(2);
    expect(changes.filter(Change.isAddition)).toHaveLength(2);
    expect(changes).toHaveLength(13);

    expect(
      changes
        .filter(Change.isRename)
        .map(({ after, before }) => ({ from: before.path, to: after.path }))
    ).toEqual([
      {
        from: "PopupOnTrigger.cy.tsx",
        to: "PopupTrigger.cy.tsx",
      },
      {
        from: "PopupOnTrigger.tsx",
        to: "PopupTrigger.tsx",
      },
    ]);
  });
});
