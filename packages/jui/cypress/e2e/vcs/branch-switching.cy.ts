import {
  branch,
  commit,
  file,
  fromCurrentBranch,
  gitInit,
} from "../../support/example-app";

describe("vcs => branch switching", () => {
  beforeEach(() => {
    cy.initialization(
      gitInit(
        commit([file("test-on-both-branches.ts")]),
        fromCurrentBranch(
          branch(
            "branch-1",
            commit([
              file("test-on-both-branches.ts"),
              file("test-on-branch-1.ts"),
            ])
          ),
          branch(
            "branch-2",
            commit([
              file("test-on-both-branches.ts"),
              file("test-on-branch-2.ts"),
            ])
          )
        )
      )
    );
  });

  it("can switch branches updating files in project view and the editor", () => {
    cy.step("Check files and their content on branch-2");
    cy.findTreeNodeInProjectView("test-on-branch-2.ts").dblclick();
    cy.contains("test-on-branch-2.ts content on branch-2");
    cy.findTreeNodeInProjectView("test-on-both-branches.ts").dblclick();
    cy.contains("test-on-both-branches.ts content on branch-2");

    cy.step("Switch to branch-1");
    cy.focused(); // waiting for the editor (or whatever element) to get focused, so the keyboard events can be handled
    cy.searchAndInvokeAction("Branches", "Branches...");
    cy.contains("branch-1").realClick();
    cy.findByRole("menuitem", { name: "Checkout" }).realClick();

    cy.step("Check files and their content on branch-1");
    cy.findTreeNodeInProjectView("test-on-branch-2.ts").should("not.exist");
    cy.findByRole("tab", { name: "test-on-branch-2.ts" }).should("not.exist");
    cy.findByRole("tab", { name: "test-on-both-branches.ts" }).should("exist");
    cy.findTreeNodeInProjectView("test-on-branch-1.ts").dblclick();
    cy.contains("test-on-branch-1.ts content on branch-1");
    cy.findTreeNodeInProjectView("test-on-both-branches.ts").dblclick();
    cy.contains("test-on-both-branches.ts content on branch-1");
  });
});
