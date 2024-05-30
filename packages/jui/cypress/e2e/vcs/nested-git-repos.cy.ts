import {
  commit,
  dir,
  file,
  gitAdd,
  gitInit,
  persistedGitSettings,
} from "../../support/example-app";

const sampleRepo = gitInit(
  commit([file("modified-file.ts")]),
  gitAdd(file("modified-file.ts", "updated content"))
);
describe("vcs => file status colors", () => {
  /**
   * FIXME: fix the issues and unskip the test below. There are two issues currently:
   *  - The change nodes of the nested repo are repeated in the parent repo tree, if changes are grouped by repo
   *  - git.statusMatrix reports the files in the nested repo as "new, untracked"
   */
  it.skip("doesn't show the changes of a nested repo in the outer repo", () => {
    cy.initialization(
      dir("parent-repo", [sampleRepo]),
      dir("parent-repo/nested-repo", [sampleRepo]),
      persistedGitSettings({
        gitRoots: ["parent-repo", "parent-repo/nested-repo"],
      })
    );
    cy.contains("Commit").click();
    cy.findTreeNodeInChangesView("/workspace/parent-repo/nested-repo").should(
      "contain.text",
      "1 file"
    );

    cy.findTreeNodeInChangesView("/workspace/parent-repo").should(
      "contain.text",
      "1 file"
    ); // not two files
  });
});
