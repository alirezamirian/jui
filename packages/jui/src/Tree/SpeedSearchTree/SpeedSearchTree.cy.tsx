import { composeStories } from "@storybook/react";
import * as React from "react";
import * as stories from "./SpeedSearchTree.stories";
import { Item, SpeedSearchTree } from "@intellij-platform/core";

const { Dynamic, HighlightsWithSpace } = composeStories(stories);

// Should probably be moved into a common test utility
const OS_NORMALIZED_META = Cypress.platform === "darwin" ? "Meta" : "Control";

describe("SpeedSearchTree", () => {
  it("expands/collapses and navigates nodes by arrow keys", () => {
    cy.mount(
      <SpeedSearchTree selectionMode="multiple">
        <Item title="node 1">
          <Item>node 1.1</Item>
          <Item>node 1.2</Item>
        </Item>
      </SpeedSearchTree>
    );

    cy.findByRole("treeitem") // only one should be visible initially
      .click() // focus
      .realPress("ArrowRight");
    // node 1 should be expanded
    cy.findByRole("treeitem", { name: "node 1.1" });
    cy.findByRole("treeitem", { name: "node 1.2" });
    // but selection doesn't go to the children right away
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowDown");
    cy.findByRole("treeitem", { name: "node 1.1", selected: true });
    cy.realPress("ArrowDown");
    cy.findByRole("treeitem", { name: "node 1.2", selected: true });
    cy.realPress("ArrowLeft"); // selection should move to node 1 but it remains expanded
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowLeft"); // the second ArrowLeft closes the node
    cy.findAllByRole("treeitem").should("have.length", 1);

    cy.realPress("ArrowRight"); // expanding the node again and going down with ArrowRight this time
    cy.findByRole("treeitem", { name: "node 1", selected: true });
    cy.realPress("ArrowRight");
    cy.findByRole("treeitem", { name: "node 1.1", selected: true });
    cy.realPress("ArrowRight");
    cy.findByRole("treeitem", { name: "node 1.2", selected: true });
  });

  it("supports Speed Search in dynamic items mode", () => {
    cy.mount(<Dynamic />);

    cy.get("#tree").focus(); // move focus to an element in tree. it could be the tree itself too.

    // do a search where the first item and two more are matched.
    cy.realType("d");
    matchImageSnapshot("SpeedSearchTree-1-searched");

    // Click a non-match item. it should replace the selection to that item, even though it's not a match.
    cy.contains("BasicListItem.tsx").click();
    matchImageSnapshot("SpeedSearchTree-2-selection-outside-match");

    // type a "t" which would reduce the results to two. Now selection should move to the first match after
    // current selection ("BasicListItem.tsx"), which would be "ListDivider.tsx".
    cy.realType("t");
    matchImageSnapshot(
      "SpeedSearchTree-3-selection-moved-to-first-match-after-selection"
    );

    // moving up now should move selection to the first match, which is "index.ts"
    cy.realPress("ArrowUp");
    matchImageSnapshot("SpeedSearchTree-4-selection-moved-to-previous-match");

    // Select all should select all matches, which is "index.ts" and "ListDivider.tsx"
    cy.realPress([OS_NORMALIZED_META, "a"]);
    matchImageSnapshot("SpeedSearchTree-5-select-all");

    // moving selection to an item after which there is no match. Trigger a new search by adding an "s".
    // selection should be moved to the first match, which is "index.ts"
    cy.contains("createTheme.ts").click();
    cy.realPress("s");
    matchImageSnapshot("SpeedSearchTree-6-selection-moved-to-first-match");

    // removing one search character. it since the currently selected items include a match, selection should not change
    cy.realPress("{backspace}");
    matchImageSnapshot("SpeedSearchTree-7-selection-already-contains-a-match");

    // moving up now should move selection to the first match, which is "index.ts"
    cy.realPress("Escape");
    matchImageSnapshot("SpeedSearchTree-8-search-exited");
  });
  it("preserves space before/after highlights", () => {
    cy.mount(<HighlightsWithSpace />);
    cy.contains("Paco de Lucia").type("de");
    // local snapshot is disappointing.
    cy.percySnapshot("SpeedSearchTree-highlights-with-space");
  });

  it('focuses and selects the first item, when autofocus is "first"', () => {
    cy.mount(
      <SpeedSearchTree autoFocus="first" selectionMode="single">
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </SpeedSearchTree>
    );
    cy.findAllByRole("treeitem")
      .first()
      .should("have.focus")
      .should("have.attr", "aria-selected", "true");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]", { timeout: 10000 }).should("not.exist");
  cy.get("#component-container").toMatchImageSnapshot({
    name: snapshotsName,
    screenshotConfig: { padding: [25, 0] },
    imageConfig: {
      threshold: 0.03, // should be less than ~0.04 to detect change in a single row change in selection
    },
  });
}
