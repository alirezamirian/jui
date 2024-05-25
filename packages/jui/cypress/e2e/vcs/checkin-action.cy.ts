import { gitInit } from "../../support/example-app";

describe("vcs => checkin action", () => {
  it("opens commit tool window and focuses commit message editor", () => {
    cy.initialization(gitInit());
    cy.searchAndInvokeAction("Commit");
    cy.findByPlaceholderText("Commit Message").should("be.focused");
  });

  it("has the default Cmd+K key mapping", () => {
    cy.initialization(gitInit());
    cy.realPress(["Meta", "k"]);
    cy.findByPlaceholderText("Commit Message").should("be.focused");
  });
});
