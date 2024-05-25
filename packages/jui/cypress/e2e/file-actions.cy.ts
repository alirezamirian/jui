import { gitInit } from "../support/example-app";

beforeEach(() => {
  // cy.playback("GET", /https:\/\/raw\.githubusercontent.com/);
});

const deleteFile = (filename: string) => {
  cy.findTreeNodeInProjectView(filename).realClick().should("be.focused");
  cy.realPress("Backspace");
  cy.findByRole("button", { name: "Ok" }).realClick();
  cy.findByRole("treeitem", { name: new RegExp(filename) }).should("not.exist");
};

describe("files actions", () => {
  it("can create, delete and recreate a file without vcs", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return !err.message.includes(
        "NetworkError: Failed to execute 'importScripts' on 'WorkerGlobalScope'"
      );
    });

    function createFileWithoutVcs(filename: string) {
      cy.createFile(filename);
      cy.findByRole("tab", { name: filename, selected: true }); // The new file opened in the editor
      cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused
    }
    cy.initialization();

    createFileWithoutVcs("test.ts");

    createFileWithoutVcs("test2.ts");

    deleteFile("test2.ts");

    // Focus was on the project tool window and should be restored to it.
    // Selection should change from the deleted file to it's parent
    cy.findByRole("treeitem", { name: /Workspace/ }).should("be.focused");
    cy.findByRole("tab", { name: "test2.ts", selected: true }).should(
      "not.exist"
    );

    createFileWithoutVcs("test2.ts");

    // Make sure the file content from the deleted file was not cached
    cy.get("textarea").should("have.value", "Test content");
  });

  it("file creation and deletion, with vcs enabled", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return !err.message.includes(
        "NetworkError: Failed to execute 'importScripts' on 'WorkerGlobalScope'"
      );
    });

    cy.initialization(gitInit());

    cy.createFile("test.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.realPress("Escape");
    cy.findByRole("tab", { name: "test.ts", selected: true }); // The new file opened in the editor
    cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.createFile("test2.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.findByRole("button", { name: "Add" }).realPress("Enter");
    cy.findByRole("tab", { name: "test2.ts", selected: true }); // The new file opened in the editor
    cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.createFile("test3.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.findByRole("button", { name: "Cancel" }).realClick();
    cy.findByRole("tab", { name: "test3.ts", selected: true }); // The new file opened in the editor
    cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.contains("Commit").click();

    cy.findByRole("tree", { name: "Commit changes tree" })
      .findAllByRole("treeitem", { name: /test([23])?.ts/ })
      .should("have.length", 3);

    deleteFile("test2.ts");

    cy.findByRole("tree", { name: "Commit changes tree" })
      .findAllByRole("treeitem", { name: /test([23])?.ts/ })
      .should("have.length", 2);

    cy.percySnapshot(); // To check file statuses
  });
});
