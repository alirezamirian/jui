import { persistedGitSettings } from "../../support/example-app";

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
    })
  );
  cy.searchAndInvokeAction("clone");
  cy.findByLabelText(/Directory/i).should("have.value", "/workspace");
  cy.findByRole("combobox", { name: /Url/i })
    .should("have.value", "")
    .should("be.focused")
    .type("{downArrow}");
  cy.findByRole("option", { name: /example-branches/ }).click();
  cy.findByRole("combobox", { name: /Url/i })
    .should("have.value", "https://github.com/thurwitz/example-branches.git")
    .type("{enter}");
  cy.findTreeNodeInProjectView("example-branches");
});
