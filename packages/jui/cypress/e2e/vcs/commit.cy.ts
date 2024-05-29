import { file, gitAdd, gitInit } from "../../support/example-app";

// NOTE: Different expectations are intentionally bundled to minimize the number of test cases for performance
// reasons, since each e2e test has the overhead of loading the app, which takes a few seconds.
it("commits changes", () => {
  cy.initialization(gitInit(gitAdd(file("test.ts"))));
  // Waiting for the test file to open in the editor to avoid a flakiness in clicking Commit button. That's because
  // the editor sometimes loads while .click() command is being executed on Commit button, and the focus shift from
  // Commit toolwindow to the editor makes the button change classes (going from default to non-default variant),
  // which prevents cypress from finding the element after it checks it's accessible for clicking.
  cy.contains("test.ts content on master");
  cy.contains("Commit").click();
  cy.findByRole("tree", { name: "Commit changes tree" })
    .findAllByRole("checkbox", { selected: true })
    .should("have.length", 0);

  cy.step("Check it requires changes to be selected");
  cy.findByRole("button", { name: "Commit" }).click();
  cy.contains("Select files to commit");

  cy.step("Check it requires commit message");
  cy.findTreeNodeInChangesView("Changes").findByRole("checkbox").click();
  cy.findByRole("button", { name: "Commit" }).click();
  cy.contains("Specify commit message");

  cy.step("Commit changes");
  cy.findByPlaceholderText("Commit Message").type("test commit message");
  cy.findByRole("button", { name: "Commit" }).click();
  cy.findTreeNodeInChangesView("Changes").should("contain", "No files");
  cy.contains("1 file committed: test commit message");

  cy.step("Check the commit is shown in Git toolwindow");
  cy.contains("Version Control").click();
  cy.findByLabelText("Commits list").contains("test commit message").click();
  cy.findByLabelText("Commit changes")
    .findByRole("treeitem", { name: "test.ts" })
    .should("have.fileStatusColor", "new");
});
