import * as fs from "fs";
import path from "path";

import { getCommitChanges } from "./getCommitChanges";
import { Change } from "../../Changes/Change";
import { detectRenames } from "../../Changes/detectRenames";

const repoPath = path.resolve(
  // eslint-disable-next-line no-undef
  __dirname,
  "../../../../fixture/git/diff-example.git"
);

describe("getCommitChanges", () => {
  it("consolidates new and deleted files if the content is more than 50% similar", async () => {
    const changes = await detectRenames(
      await getCommitChanges({
        fs,
        fromRef: "21d19576802af30b349e49ce09ff3201755a2457",
        toRef: "7a4535a30be43ee6a9099ab3f625a3483934de35",
        gitdir: repoPath,
      })
    );
    expect(changes.filter(Change.isRename).map(Change.path)).toEqual(
      expect.arrayContaining(["PopupTrigger.cy.tsx", "PopupTrigger.tsx"])
    );
    expect(changes.filter(Change.isModified).map(Change.path)).toEqual(
      expect.arrayContaining([
        "IdeStatusBar.tsx",
        "Popup.tsx",
        "PopupContext.tsx",
        "PopupManager.tsx",
        "PopupOnTrigger.stories.tsx",
        "index.ts",
        "popup-and-menu.cy.tsx",
        "useVcsActions.tsx",
      ])
    );
    expect(changes.filter(Change.isAddition).map(Change.path)).toEqual(
      expect.arrayContaining(["BranchesPopup.tsx", "PopupTrigger.stories.tsx"])
    );
    expect(changes.filter(Change.isDeletion).map(Change.path)).toEqual(
      expect.arrayContaining(["BranchesPopupContent.tsx"])
    );
    expect(changes).toHaveLength(13);
  });
});
