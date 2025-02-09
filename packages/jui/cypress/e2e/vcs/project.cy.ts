import { dir, file } from "../../support/example-app/initializers";

describe("Project view", () => {
  it("can scroll to and select the open file", () => {
    cy.initialization(
      ...Array(100)
        .fill(null)
        .map((_, i) => file(`f${(i + 1).toString().padStart(3, "0")}`)),
      dir(
        "dir1",
        Array(100)
          .fill(null)
          .map((_, i) => file(`d1-f${(i + 1).toString().padStart(3, "0")}`))
      ),
      dir(
        "dir2",
        Array(100)
          .fill(null)
          .map((_, i) => file(`d2-f${(i + 1).toString().padStart(3, "0")}`))
      )
    );

    cy.step("Expand to, scroll to, focus and select the open file");
    openAndSelectFileInProjectView("f100");
    openAndSelectFileInProjectView("dir1/d1-f100");
    openAndSelectFileInProjectView("f060");

    cy.step("From fully collapsed tree");
    cy.findByRole("button", { name: "Collapse All" }).click();
    openAndSelectFileInProjectView("dir1/d1-f100");

    cy.realPress("ArrowUp");
    cy.findTreeNodeInProjectView("d1-f099", { selected: true }).should(
      "be.focused"
    );

    function openAndSelectFileInProjectView(filename: string) {
      cy.searchAndOpenFile({ filename });
      cy.findByRole("button", { name: "Select Opened File" }).click();
      cy.findTreeNodeInProjectView(filename.split("/").slice(-1)[0], {
        selected: true,
      })
        .should("be.visible")
        .and("be.focused");
    }
  });
});
