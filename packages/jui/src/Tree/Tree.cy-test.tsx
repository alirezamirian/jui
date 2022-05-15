import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./Tree.stories";

const { Static, ScrollAndContainerWidth } = composeStories(stories);

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

  /**
   * This test makes sure virtualization doesn't affect content width. It's relevant because when virtualization is used
   * items are usually rendered inside absolutely positioned elements, where the width should explicitly be set,
   * instead of implicitly determined based on the content.
   */
  it("takes the necessary width based on the visible item's content", () => {
    mount(<ScrollAndContainerWidth />);
    cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
    cy.get("[data-testid=tree]").scrollTo(0, 230);
    cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
    cy.get("[data-testid=tree]").scrollTo("right");
    matchImageSnapshot("Tree-horizontal-scrolled-midway");
    cy.get("[data-testid=tree]").scrollTo("bottom");
    matchImageSnapshot("Tree-horizontal-scrolled-all-the-way");
    cy.get("[data-testid=tree]").scrollTo("top");
    cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
    mount(<ScrollAndContainerWidth width={200} />);
    cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
    mount(<ScrollAndContainerWidth width={300} />);
    cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
    matchImageSnapshot("Tree-horizontal-scrolled-resized");
  });
});

const notBeHorizontallyScrollable = ($el: JQuery) => {
  const el = $el.get(0);
  expect(el.scrollWidth).not.to.be.above(
    el.offsetWidth,
    "tree is not scrollable"
  );
};
const beHorizontallyScrollable = ($el: JQuery) => {
  const el = $el.get(0);
  expect(el.scrollWidth).to.be.above(el.offsetWidth, "tree is scrollable");
};

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
