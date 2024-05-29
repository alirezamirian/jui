import {
  commit,
  deleteFile,
  dir,
  file,
  gitAdd,
  gitInit,
  persistedGitSettings,
} from "../../support/example-app";

describe("vcs => file status colors", () => {
  const withDifferentChangeTypes = gitInit(
    commit([file("modified-file.ts"), file("removed-file.ts")]),
    file("modified-file.ts", "updated content"),
    gitAdd(file("new-file.ts")),
    file("unversioned-file.ts"),
    deleteFile("removed-file.ts")
  );

  const checkColors = () => {
    cy.step("Colors in project tool window");
    cy.findTreeNodeInProjectView("modified-file.ts").should(
      "have.fileStatusColor",
      "modified"
    );
    cy.findTreeNodeInProjectView("new-file.ts").should(
      "have.fileStatusColor",
      "new"
    );
    cy.findTreeNodeInProjectView("unversioned-file.ts").should(
      "have.fileStatusColor",
      "unversioned"
    );

    cy.step("Colors in Commit tool window");
    cy.contains("Commit").click();
    cy.findTreeNodeInChangesView("modified-file.ts").should(
      "have.fileStatusColor",
      "modified"
    );
    cy.findTreeNodeInChangesView("new-file.ts").should(
      "have.fileStatusColor",
      "new"
    );
    cy.findTreeNodeInChangesView("removed-file.ts").should(
      "have.fileStatusColor",
      "deleted"
    );
    cy.findTreeNodeInChangesView("unversioned-file.ts").should(
      "have.fileStatusColor",
      "unversioned"
    );

    cy.step("Colors in editor tabs");
    cy.findByRole("tab", { name: "modified-file.ts" }).should(
      "have.fileStatusColor",
      "modified"
    );
    cy.findByRole("tab", { name: "new-file.ts" }).should(
      "have.fileStatusColor",
      "new"
    );
    cy.findByRole("tab", { name: "unversioned-file.ts" }).should(
      "have.fileStatusColor",
      "unversioned"
    );
  };

  it("shows the right color in different places, if files are in a git repo", () => {
    cy.initialization(withDifferentChangeTypes);
    checkColors();
  });

  it("shows the right colors when some folders in workspace are git repos and some are not", () => {
    cy.initialization(
      dir("some-repo", [withDifferentChangeTypes]),
      file("file-outside-git-root.txt"),
      persistedGitSettings({ gitRoots: ["some-repo"] })
    );
    checkColors();

    cy.findByRole("tab", { name: "file-outside-git-root.txt" }).should(
      "have.fileStatusColor",
      "unmodified"
    );

    cy.findTreeNodeInProjectView("file-outside-git-root.txt").should(
      "have.fileStatusColor",
      "unmodified"
    );
    cy.findTreeNodeInChangesView("file-outside-git-root.txt").should(
      "not.exist"
    );
  });
});
