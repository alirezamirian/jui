import * as React from "react";
import { SpeedSearchTree, Tree } from "@intellij-platform/core";
import {
  staticSpeedSearchTreeItems,
  staticTreeItems,
} from "@intellij-platform/core/Tree/story-helpers";
import { TreeActionsWrapper } from "@intellij-platform/core/TreeActions/story-and-test-helpers";

[
  { Component: SpeedSearchTree, staticTreeItems: staticSpeedSearchTreeItems },
  { Component: Tree, staticTreeItems: staticTreeItems },
].forEach(({ Component, staticTreeItems }) => {
  const example = (
    <TreeActionsWrapper>
      {(treeRef) => (
        <Component
          treeRef={treeRef}
          selectionMode="multiple"
          defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
        >
          {staticTreeItems}
        </Component>
      )}
    </TreeActionsWrapper>
  );
  describe(`Actions on ${Component.name}`, () => {
    describe("Expand All", () => {
      it("expands all nodes, via shortcut", () => {
        cy.mount(example);
        cy.contains("BasicList.tsx").click();
        cy.findAllByRole("treeitem").should("have.length.lessThan", 15);
        cy.realPress(["Meta", "="]);
        cy.findAllByRole("treeitem").should("have.length", 15);

        // FIXME: there seems to be a bug in cy.realPress, when triggering Meta+NumpadAdd. (["Meta", "+"]).
        //  location for the triggered key down event is 1, causing the shortcut handler function to ignore it.
        //  location should be 3, and is actually set so here: https://github.com/dmtrKovalenko/cypress-real-events/blob/0614ae20c817f269ae66b490a874192dcb89b956/src/keyCodeDefinitions.ts#L204
        //  But for some reason it will be 1 on the dispatched events.
        // cy.mount(<Component />);
        // cy.contains("BasicList.tsx").click();
        // cy.findAllByRole("treeitem").should("have.length.lessThan", 15);
        // cy.realPress(["Meta", "+"]);
        // cy.findAllByRole("treeitem").should("have.length", 15);
      });
    });
    describe("Collapse All", () => {
      it("collapses all nodes, via shortcut", () => {
        cy.mount(example);
        cy.contains("BasicList.tsx").click();
        cy.findAllByRole("treeitem").should("have.length.greaterThan", 3);
        cy.realPress(["Meta", "Minus"]);
        cy.findAllByRole("treeitem").should("have.length", 3);
      });
      it("selects the root node which is the grandparent of the focused/selected node", () => {
        cy.mount(example);
        cy.contains("BasicList.tsx").click();
        cy.findAllByRole("treeitem").should("have.length.greaterThan", 3);
        cy.realPress(["Meta", "Minus"]);
        cy.findByRole("treeitem", { selected: true, name: "List" });
        cy.findAllByRole("treeitem", { selected: true }).should(
          "have.length",
          1
        );

        // focus should be kept:
        cy.realPress(["Meta", "="]);
        cy.findAllByRole("treeitem").should("have.length", 15);
      });
    });
  });
  describe(`Expand/Shrink selection`, () => {
    it("works", () => {
      cy.mount(example);
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
      cy.mount(example);
      cy.contains("useBasicList.ts").click();
      cy.contains("BasicListItem.tsx").click({ cmdKey: true });
      cy.contains("BasicList.tsx").click({ cmdKey: true });
      cy.contains("BasicList.stories.tsx").click({ cmdKey: true });
      cy.contains("BasicList").click({ cmdKey: true });
      shrinkSelection();
      expectSelection(["BasicList"]);
    });
    it("selects all descendants when selection is expanded from a non-leaf node", () => {
      cy.mount(example);
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
      cy.mount(example);
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
    it("shrinks selection from a root if all other children are selected", () => {
      cy.mount(example);
      cy.contains("List").click();
      expandSelection(); // "List" and all of its descendants are selected now
      expandSelection(); // All nodes are selected now
      shrinkSelection(); // Shrinking selection should move selection back to "List" and all of its descendants
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

    it("shrinks selection when the tree has a single root", () => {
      cy.mount(
        <TreeActionsWrapper>
          {(treeRef) => (
            <Component
              treeRef={treeRef}
              selectionMode="multiple"
              defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
            >
              {staticTreeItems[1]}
            </Component>
          )}
        </TreeActionsWrapper>
      );
      cy.contains("List").click();
      expandSelection(); // "List" and all of its descendants are selected now
      shrinkSelection(); // Shrinking selection should move selection back to "List" and all of its descendants
      expectSelection(["List"]);
    });
  });
});

function expandSelection() {
  cy.realPress(["Alt", "ArrowUp"]);
}
function shrinkSelection() {
  cy.realPress(["Alt", "ArrowDown"]);
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
