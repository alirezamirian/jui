import { cd, dir, persistedGitSettings } from "../../support/example-app";

it("clones a git repo", () => {
  cy.initialization(
    persistedGitSettings({
      rememberedInputs: {
        urls: [
          "https://github.com/thurwitz/example-branches.git",
          "https://github.com/alirezamirian/jui.git",
        ],
        cloneParentDir: "/workspace",
      },
    }),
    cd("/", dir("/Users/ali/workspace"), dir("/Users/alireza"))
  );
  cy.searchAndInvokeAction("clone");
  cy.findByLabelText(/Directory/i).should("have.value", "/workspace");
  cy.findByRole("combobox", { name: /Url/i })
    .should("have.value", "")
    .should("be.focused")
    .type("{downArrow}");
  cy.findByRole("option", { name: /example-branches/ }).click();
  cy.findByRole("combobox", { name: /Url/i }).should(
    "have.value",
    "https://github.com/thurwitz/example-branches.git"
  );
  cy.findByLabelText(/Directory/i)
    .should("have.value", "/workspace/example-branches") // clone directory auto set when not changed manually
    .focus()
    .type("{moveToStart}{rightArrow}")
    .realPress(["Control", " "]); // invoke autocompletion
  cy.findByLabelText(/Directory/i)
    .its("[0].selectionStart")
    .should("eq", 1);
  cy.findByLabelText(/Directory/i)
    .its("[0].selectionEnd")
    .should("eq", 1 + "workspace/example-branches".length);
  cy.realPress("ArrowDown").realPress("Enter");
  // There is currently an issue with autocomplete popover getting aria-hidden
  // cy.findByRole("option", { name: "alireza" })
  cy.contains("alireza") // FIXME: switch to the line above.
    .click()
    .realType("example-branches");
  cy.findByLabelText(/Directory/i)
    .should("have.value", "/Users/alireza/example-branches")
    .type("{selectAll}/workspace/example-branches")
    .type("{enter}");
  cy.contains("Cloning");
  cy.findTreeNodeInProjectView("example-branches");
});
