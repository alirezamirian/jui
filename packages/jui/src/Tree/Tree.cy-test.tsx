import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./Tree.stories";

const { Static } = composeStories(stories);

describe("Tree", () => {
  it("opens nested expandable single-child items", () => {
    mount(<Static />);

    cy.contains("Foo").click().type("{enter}");
    matchImageSnapshot("Tree-nested-single-child-expansion");
  });

  it("collapses descendant items of a node that is collapsed", () => {
    mount(<Static />);

    cy.contains("List") // "List" item is expanded by default and has expanded children
      .click() // select it
      .type("{enter}") // collapse it
      .type("{enter}"); // collapse expand it. Initially expanded children should now be collapsed
    matchImageSnapshot("Tree-children-collapsed-when-parent-collapsed");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.percySnapshot(snapshotsName);
}
