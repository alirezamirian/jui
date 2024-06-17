import { dir, file, gitInit } from "../support/example-app";

beforeEach(() => {
  // cy.playback("GET", /https:\/\/raw\.githubusercontent.com/);
});

const deleteFile = (filename: string) => {
  cy.step(`Delete ${filename}`);
  cy.findTreeNodeInProjectView(filename).click().should("be.focused");
  cy.realPress("Backspace");
  cy.findByRole("button", { name: "Ok" }).click();
  cy.findByRole("treeitem", { name: new RegExp(filename) }).should("not.exist");
};

function createFileWithoutVcs(filename: string) {
  const basename = filename.split("/").slice(-1)[0];

  cy.step(`Create ${filename}`);
  cy.createFile(filename);
  cy.findByRole("tab", { name: basename, selected: true }); // The new file opened in the editor
  cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused
}

function createDirectory(pathname: string) {
  cy.step(`Create ${pathname}`);
  cy.findByRole("tree", { name: "Project structure tree" })
    .findAllByRole("treeitem", { name: /workspace/i })
    .first()
    .click()
    .should("be.focused");

  cy.searchAndInvokeAction("Directory", "create directory");
  cy.findByPlaceholderText("Name").should("be.focused");
  cy.realType(pathname, { delay: 1 });
  cy.realPress("Enter");
}

describe("files actions", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return !err.message.includes(
        "NetworkError: Failed to execute 'importScripts' on 'WorkerGlobalScope'"
      );
    });
  });

  it("can create, delete and recreate a file without vcs", () => {
    cy.initialization();

    createFileWithoutVcs("test.ts");

    createFileWithoutVcs("test2.ts");

    deleteFile("test2.ts");

    // Focus was on the project tool window and should be restored to it.
    // Selection should change from the deleted file to its parent
    cy.findByRole("treeitem", { name: /Workspace/ }).should("be.focused");
    cy.findByRole("tab", { name: "test2.ts", selected: true }).should(
      "not.exist"
    );

    createFileWithoutVcs("test2.ts");

    // Make sure the file content from the deleted file was not cached
    cy.get("textarea").should("have.value", "Test content");
  });

  it("file creation and deletion, with vcs enabled", () => {
    cy.initialization(gitInit());

    cy.step(`Create test.ts`);
    cy.createFile("test.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.realPress("Escape");
    cy.findByRole("tab", { name: "test.ts", selected: true }); // The new file opened in the editor
    // FIXME: Having the editor focused doesn't work when tests are run on CI env. The current implementation is also
    //  a little shady, as it depends on random waiting for the editor to get focused. But the issue doesn't seem to
    //  happen outside tests anyway ¯\_(ツ)_/¯
    // cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.step(`Create test2.ts`);
    cy.createFile("test2.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.findByRole("button", { name: "Add" }).realPress("Enter");
    cy.findByRole("tab", { name: "test2.ts", selected: true }); // The new file opened in the editor

    // FIXME: Having the editor focused doesn't work when tests are run on CI env. The current implementation is also
    //  a little shady, as it depends on random waiting for the editor to get focused. But the issue doesn't seem to
    //  happen outside tests anyway ¯\_(ツ)_/¯
    // cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.step(`Create test3.ts`);
    cy.createFile("test3.ts");
    cy.findByRole("dialog", { name: "Add File to Git" });
    cy.findByRole("button", { name: "Cancel" }).click();
    cy.findByRole("tab", { name: "test3.ts", selected: true }); // The new file opened in the editor
    // FIXME: Having the editor focused doesn't work when tests are run on CI env. The current implementation is also
    //  a little shady, as it depends on random waiting for the editor to get focused. But the issue doesn't seem to
    //  happen outside tests anyway ¯\_(ツ)_/¯
    // cy.get("textarea").should("be.focus").realType("Test content"); // Editor focused

    cy.step(`Check changes`);
    cy.contains("Commit").click();
    cy.findByRole("tree", { name: "Commit changes tree" })
      .findAllByRole("treeitem", { name: /test([23])?.ts/ })
      .should("have.length", 3);

    cy.step(`Delete test2.ts`);
    deleteFile("test2.ts");

    cy.step(`Check changes again`);
    cy.findByRole("tree", { name: "Commit changes tree" })
      .findAllByRole("treeitem", { name: /test([23])?.ts/ })
      .should("have.length", 2);

    cy.percySnapshot(); // To check file statuses
  });

  it("can delete directories", () => {
    cy.initialization(
      dir("d1", [dir("d2", [dir("d3", [file("f1.ts")])])]),
      dir("d4", [dir("d5", [dir("d6")])]),
      file("f2.ts")
    );
    cy.findByRole("button", { name: "Expand All" }).click();

    cy.findTreeNodeInProjectView("f1.ts").ctrlClick();
    cy.findTreeNodeInProjectView("f2.ts").ctrlClick();
    cy.findTreeNodeInProjectView("d3").ctrlClick();
    cy.findTreeNodeInProjectView("d1").ctrlClick();
    cy.findTreeNodeInProjectView("d5").ctrlClick();
    cy.realPress("Backspace");
    cy.findByRole("button", { name: "Delete" }).click();
    cy.findTreeNodeInProjectView("d4").should("exist");
    cy.findTreeNodeInProjectView("d1").should("not.exist");
    cy.findTreeNodeInProjectView("d2").should("not.exist");
    cy.findTreeNodeInProjectView("d3").should("not.exist");
    cy.findTreeNodeInProjectView("d5").should("not.exist");
    cy.findTreeNodeInProjectView("f1.ts").should("not.exist");
    cy.findTreeNodeInProjectView("f2.ts").should("not.exist");
  });

  it("can create nested directories when creating a new file", () => {
    cy.initialization();

    createFileWithoutVcs("foo/bar/baz/test.ts");

    // project view should be updated
    cy.findTreeNodeInProjectView("foo").dblclick(); // it opens all nested children since they are the only child
    cy.findTreeNodeInProjectView("bar");
    cy.findTreeNodeInProjectView("baz");
    cy.findTreeNodeInProjectView("test.ts");
  });

  it("can create nested directories when creating a new directory", () => {
    cy.initialization();

    createDirectory("foo/bar/baz");

    cy.findTreeNodeInProjectView("foo").dblclick(); // it opens all nested children since they are the only child
    cy.findTreeNodeInProjectView("bar");
    cy.findTreeNodeInProjectView("baz");
  });
});
