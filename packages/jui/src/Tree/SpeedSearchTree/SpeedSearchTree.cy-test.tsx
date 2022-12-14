import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./SpeedSearchTree.stories";

const { Dynamic, HighlightsWithSpace } = composeStories(stories);

// Should probably be moved into a common test utility
const OS_NORMALIZED_META = Cypress.platform === "darwin" ? "Meta" : "Control";

describe("SpeedSearchTree", () => {
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
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]", { timeout: 10000 }).should("not.exist");
  cy.get("#component-container").toMatchImageSnapshot({
    name: snapshotsName,
    screenshotConfig: { padding: [25, 0] },
    imageConfig: {
      threshold: 0.03, // should be less than ~0.04 to detect change in a single row change in selection
    },
  });
}
