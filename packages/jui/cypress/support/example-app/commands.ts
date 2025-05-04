/// <reference types="cypress-real-events" />
/// <reference types="@testing-library/cypress" />
/* global JQuery */

import path from "path";
import { ByRoleOptions } from "@testing-library/cypress";
import { AppGlobals } from "./AppGlobals";

type InvokeActionOptions = {
  actionName: string;
  search?: string;
  disabled?: boolean;
};

type SearchFileOptions = {
  /**
   * the full path of the file
   */
  filename: string;
  search?: string;
  /**
   * something in the content to check to make sure the file is opened.
   * false to skip the check.
   * @default `${path.basename(filename)} content`
   */
  content?: string | false;
};

declare global {
  namespace Cypress {
    interface Chainable {
      searchAndInvokeAction(actionName: string): Chainable<void>;
      searchAndInvokeAction(options: InvokeActionOptions): Chainable<void>;
      searchAndInvokeAction(arg: string | InvokeActionOptions): Chainable<void>;

      searchAndOpenFile(options: SearchFileOptions): Chainable<void>;

      /**
       * Creates a file via Projects tool window UI.
       * Assumes Project tool window is open.
       */
      createFile(...args: Parameters<typeof createFile>): Chainable<void>;
      findTreeNodeInProjectView(
        ...args: Parameters<typeof findTreeNodeInProjectView>
      ): Chainable<JQuery<HTMLElement>>;
      findTreeNodeInChangesView(
        ...args: Parameters<typeof findTreeNodeInChangesView>
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Loads the app's URL and runs a number of initializer functions in parallel.
       */
      initialization(...args: Parameters<typeof initialize>): Chainable<void>;
    }
  }
}

Cypress.Commands.add("searchAndInvokeAction", searchAndInvokeAction);
Cypress.Commands.add("searchAndOpenFile", searchAndOpenFile);
Cypress.Commands.add("createFile", createFile);
Cypress.Commands.add("findTreeNodeInProjectView", findTreeNodeInProjectView);
Cypress.Commands.add("findTreeNodeInChangesView", findTreeNodeInChangesView);
Cypress.Commands.add("initialization", initialize);

function initialize(
  ...initializeFns: Array<(params: AppGlobals) => Promise<unknown> | unknown>
) {
  cy.visit("/", {
    onBeforeLoad(win: Cypress.AUTWindow) {
      (win as any).INITIALIZE_APP = async ({ fs, git, path }: AppGlobals) => {
        await fs.promises.mkdir("/workspace");
        return Promise.all(
          initializeFns.map(async (fn) =>
            fn({
              fs,
              git,
              path,
              projectDir: "/workspace",
            })
          )
        );
      };
    },
  });
  // Without this, the keyboard events in potential next commands may get triggered before the app is fully loaded.
  cy.focused({ timeout: 8000 });
  // Editor loads asynchronously. If autofocusing after the test interactions begins causes focus to jump unexpectedly.
  cy.get(
    "textarea[aria-roledescription=editor], [data-testid=EditorZeroState]"
  );
}

function searchAndInvokeAction(arg: string | InvokeActionOptions): void {
  const {
    actionName,
    search = actionName,
    disabled,
  } = typeof arg === "string"
    ? { actionName: arg, search: arg, disabled: false }
    : arg;
  cy.realPress(["Meta", "Shift", "A"]);
  cy.findByRole("dialog");
  cy.realType(search);
  if (disabled) {
    cy.findAllByRole("row", {
      name: new RegExp(actionName, "ig"),
    }).should(`not.exist`);
    cy.findByRole("checkbox", { name: "Include disabled actions" }).click();
  }
  cy.findByRole("row", {
    name: new RegExp(actionName, "ig"),
    selected: true,
  });
  cy.realPress("Enter");
}

function searchAndOpenFile({
  filename,
  search = filename,
  content = `${path.basename(filename)} content`,
}: SearchFileOptions): void {
  cy.realPress(["Meta", "Shift", "O"]);
  cy.findByRole("dialog");
  cy.realType(search);
  cy.findAllByRole("row", { name: filename })
    .click()
    // pressing enter should not be necessary (TODO: trigger search everywhere items on click and remove this)
    .realPress("Enter");
  if (content) {
    cy.contains(content);
  }
}

function findTreeNodeInProjectView(
  filename: string,
  options?: Omit<ByRoleOptions, "name">
) {
  return cy
    .findByRole("tree", { name: "Project structure tree" })
    .findByRole("treeitem", { name: new RegExp(filename), ...options });
}

function findTreeNodeInChangesView(filename: string) {
  cy.findByRole("tree", { name: "Commit changes tree" }).findByRole(
    "treeitem",
    { name: new RegExp(filename) }
  );
}

function createFile(filename: string) {
  cy.findByRole("tree", { name: "Project structure tree" })
    .findAllByRole("treeitem", { name: /workspace/i })
    .first()
    .click()
    .should("be.focused");

  cy.searchAndInvokeAction({ actionName: "File", search: "create file" });
  cy.findByPlaceholderText("Name").should("be.focused");
  cy.realType(filename, { delay: 1 });
  cy.realPress("Enter");
}
