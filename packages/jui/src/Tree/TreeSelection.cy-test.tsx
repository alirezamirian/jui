import * as React from "react";
import { composeStories } from "@storybook/testing-react";
import * as speedSearchTreeStories from "./SpeedSearchTree/SpeedSearchTree.stories";
import * as treeStories from "./Tree.stories";

const { ExpandShrinkSelection: SpeedSearchExpandShrinkSelection } =
  composeStories(speedSearchTreeStories);
const { ExpandShrinkSelection: ExpandShrinkSelection } =
  composeStories(treeStories);

[
  { Component: SpeedSearchExpandShrinkSelection, name: "SpeedSearchTree" },
  { Component: ExpandShrinkSelection, name: "Tree" },
].forEach(({ Component, name }) => {
  describe(`${name} expand/shrink selection`, () => {
    it("works", () => {
      cy.mount(<Component />);
      cy.contains("BasicList.tsx").click();
      const selection0 = ["BasicList.tsx"];
      expectSelection(selection0);
      expandSelection();
      const selection1 = [
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
      ];
      expectSelection(selection1);
      expandSelection();
      const selection2 = [
        "BasicList", // parent added
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
      ];
      expectSelection(selection2);
      expandSelection();
      const selection3 = [
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList", // parent's siblings added
        "ListDivider.tsx", // parent's siblings added
      ];
      expectSelection(selection3);
      expandSelection();
      const selection4 = [
        "List", // grand parent added
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList",
        "ListDivider.tsx",
      ];
      expectSelection(selection4);
      expandSelection();
      const selection5 = [
        "index.ts", // all root nodes added
        "List",
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList",
        "ListDivider.tsx",
        "Theme", // all root nodes added
        "createTheme.ts", // all root nodes added
      ];
      expectSelection(selection5);
      expandSelection();
      // selection shouldn't change
      expectSelection(selection5);
      shrinkSelection();
      expectSelection(selection4);
      shrinkSelection();
      expectSelection(selection3);
      shrinkSelection();
      expectSelection(selection2);
      shrinkSelection();
      expectSelection(selection1);
      shrinkSelection();
      expectSelection(selection0);
      shrinkSelection();
      // selection shouldn't change
      expectSelection(selection0);
    });

    it("deselects all descendants when selection is shrunk from a non-leaf node", () => {
      cy.mount(<Component />);
      cy.contains("useBasicList.ts").click();
      cy.contains("BasicListItem.tsx").click({ cmdKey: true });
      cy.contains("BasicList.tsx").click({ cmdKey: true });
      cy.contains("BasicList.stories.tsx").click({ cmdKey: true });
      cy.contains("BasicList").click({ cmdKey: true });
      shrinkSelection();
      expectSelection(["BasicList"]);
    });
    it("selects all descendants when selection is expanded from a non-leaf node", () => {
      cy.mount(<Component />);
      cy.contains("List").click();
      expandSelection();
      expectSelection([
        "List",
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList",
        "ListDivider.tsx",
      ]);
    });
    it("doesn't shrink selection from a root if it has at least one unselected child", () => {
      cy.mount(<Component />);
      cy.contains("List").click();
      expandSelection();
      expandSelection();
      expectSelection([
        "index.ts",
        "List",
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList",
        "ListDivider.tsx",
        "Theme",
        "createTheme.ts",
      ]);
      // Excluding a parent's sibling
      cy.contains("index.ts").ctrlClick();

      // Moving focus back to selection, by deselecting and selecting a child
      cy.contains("BasicList").ctrlClick();
      cy.contains("BasicList").ctrlClick();
      shrinkSelection();
      expectSelection([
        "BasicList",
        "BasicList.stories.tsx",
        "BasicList.tsx",
        "BasicListItem.tsx",
        "useBasicList.ts",
        "SpeedSearchList",
        "ListDivider.tsx",
        "Theme",
        "createTheme.ts",
      ]);
    });
  });
});

function expandSelection() {
  cy.contains("Expand selection").click();
}
function shrinkSelection() {
  cy.contains("Shrink selection").click();
}

function expectSelection(selectedItems: string[]) {
  cy.findAllByRole("treeitem", { selected: true }).should(
    "have.length",
    selectedItems.length
  );
  selectedItems.forEach((name) => {
    cy.findByRole("treeitem", { name }).should("be.selected");
  });
}
