import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./SpeedSearchTree.stories";

const { Dynamic } = composeStories(stories);

describe("SpeedSearchTree", () => {
  it("supports Speed Search in dynamic items mode", () => {
    mount(<Dynamic />);

    cy.contains("index.ts").focus(); // move focus to an element in tree. it could be the tree itself too.

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
    cy.realPress(["Meta", "a"]);
    matchImageSnapshot("SpeedSearchTree-5-select-all");

    // moving up now should move selection to the first match, which is "index.ts"
    cy.realPress("Escape");
    matchImageSnapshot("SpeedSearchTree-6-search-exited");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("#component-container").toMatchImageSnapshot({
    name: snapshotsName,
    screenshotConfig: { padding: [25, 0] },
    imageConfig: {
      threshold: 0.03, // should be less than ~0.04 to detect change in a single row change in selection
    },
  });
}
