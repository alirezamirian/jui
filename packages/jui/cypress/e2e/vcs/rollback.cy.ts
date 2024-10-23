import {
  commit,
  deleteFile,
  file,
  gitAdd,
  gitInit,
} from "../../support/example-app";

describe("vcs => rollback", () => {
  const withDifferentChangeTypes = gitInit(
    commit([file("existing-file.ts"), file("removed-file.ts")]),
    file("existing-file.ts", "updated content"),
    gitAdd(file("new-file.ts")),
    deleteFile("removed-file.ts")
  );

  it("can rollback a combination of additions and modifications, not deleting local copies", () => {
    cy.initialization(withDifferentChangeTypes);

    cy.step("Verify initial state");
    cy.findTreeNodeInProjectView("existing-file.ts");
    cy.findTreeNodeInProjectView("new-file.ts");
    cy.findTreeNodeInProjectView("removed-file.ts").should("not.exist");
    cy.contains("Commit").click();
    cy.findTreeNodeInChangesView("existing-file.ts");
    cy.findTreeNodeInChangesView("new-file.ts");
    cy.findTreeNodeInChangesView("removed-file.ts");

    cy.step("Rollback (without deletion)");
    cy.findTreeNodeInChangesView("Changes").focus();
    cy.searchAndInvokeAction("rollback");
    cy.findByRole("button", { name: "Rollback" }).click();

    cy.step("Verify the changes are reverted");
    cy.findTreeNodeInProjectView("existing-file.ts");
    cy.findTreeNodeInProjectView("removed-file.ts");
    cy.findTreeNodeInProjectView("new-file.ts");
    cy.findTreeNodeInChangesView("Changes").should("contain.text", "No files");
    cy.findTreeNodeInChangesView("Unversioned Files").should(
      "contain.text",
      "1 file"
    );
    cy.findTreeNodeInChangesView("new-file.ts");
    cy.findByRole("tab", { name: "existing-file.ts" }); // The editor tab should remain open
    cy.findByRole("tab", { name: "new-file.ts" }); // The editor tab should remain open
  });

  it("can rollback a combination of additions and modifications, deleting local copies", () => {
    cy.initialization(withDifferentChangeTypes);

    cy.step("Verify initial state");
    cy.findTreeNodeInProjectView("existing-file.ts");
    cy.findTreeNodeInProjectView("new-file.ts");
    cy.findTreeNodeInProjectView("removed-file.ts").should("not.exist");
    cy.contains("Commit").click();
    // TODO: check file status colors https://stackoverflow.com/questions/66163312/how-to-judge-if-a-color-is-green
    cy.findTreeNodeInChangesView("existing-file.ts");
    cy.findTreeNodeInChangesView("new-file.ts");
    cy.findTreeNodeInChangesView("removed-file.ts");

    cy.step("Rollback (without deletion)");
    cy.searchAndInvokeAction("rollback");
    cy.findByRole("checkbox", { name: /Delete local copies/ })
      .click()
      .should("be.checked");
    cy.findByRole("button", { name: "Rollback" }).click();

    cy.step("Verify the files are reverted, and new files are deleted");
    cy.findTreeNodeInProjectView("existing-file.ts");
    cy.findTreeNodeInProjectView("removed-file.ts");
    cy.findTreeNodeInProjectView("new-file.ts").should("not.exist");

    cy.step("Verify the changes are reverted, and new files are deleted");
    cy.findTreeNodeInChangesView("new-file.ts").should("not.exist");
    cy.findTreeNodeInChangesView("Changes").should("contain.text", "No files");
    cy.findTreeNodeInChangesView("Unversioned Files").should("not.exist");
    cy.findByRole("tab", { name: "existing-file.ts" }); // The editor tab should remain open
    cy.findByRole("tab", { name: "new-file.ts" }).should("not.exist"); // The editor tab should get closed
  });

  it("can delete local copies when rolling back added files", () => {
    cy.initialization(gitInit(gitAdd(file("test.ts"))));

    cy.step("Verify initial state");
    cy.findTreeNodeInProjectView("test.ts");
    cy.contains("Commit").click();
    cy.findTreeNodeInChangesView("test.ts");

    cy.step("Rollback (deleting local copies)");
    cy.searchAndInvokeAction("rollback");
    cy.findByRole("checkbox", { name: /Delete local copies/ })
      .click()
      .should("be.checked");
    cy.findByRole("button", { name: "Rollback" }).click();

    cy.step("Verify the file is deleted");
    cy.findTreeNodeInProjectView("test.ts").should("not.exist");
    cy.findTreeNodeInChangesView("test.ts").should("not.exist");
    cy.findByRole("tab", { name: "test.ts" }).should("not.exist"); // The editor tab should be closed
  });

  it("can keep local copies when rolling back added files", () => {
    cy.initialization(gitInit(gitAdd(file("test.ts"))));

    cy.step("Verify initial state");
    cy.findTreeNodeInProjectView("test.ts");
    cy.contains("Commit").click();
    cy.findTreeNodeInChangesView("test.ts");

    cy.step("Rollback (without deletion)");
    cy.searchAndInvokeAction("rollback");
    cy.findByRole("button", { name: "Rollback" }).click();

    cy.step("Verify the added file still exists");
    cy.findTreeNodeInProjectView("test.ts");
    cy.findTreeNodeInChangesView("test.ts");

    cy.step("Verify the file is now untracked");
    cy.findTreeNodeInChangesView("Changes").should("contain.text", "No files");
    cy.findTreeNodeInChangesView("Unversioned Files").should(
      "contain.text",
      "1 file"
    );
    cy.findByRole("tab", { name: "test.ts" }); // The editor tab should remain open
  });
});
