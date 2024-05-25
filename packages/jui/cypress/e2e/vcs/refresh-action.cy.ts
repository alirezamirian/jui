import { file, gitInit } from "../../support/example-app";

describe("vcs => refresh action", () => {
  it("picks up externally changed files", () => {
    cy.initialization(gitInit(file("test.ts")));
    cy.contains("Commit").realClick();
    cy.findByRole("button", { name: /Refresh/ }).realClick();
    cy.findTreeNodeInChangesView("test.ts");
    cy.findTreeNodeInChangesView("Unversioned Files").should(
      "not.contain.text",
      "No files"
    );
  });
});
