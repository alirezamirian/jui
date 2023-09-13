import { composeStories } from "@storybook/react";
import * as React from "react";
import * as stories from "./Tree.stories";
import { isMac } from "@react-aria/utils";
import { Tree } from "./Tree";
import { Item } from "../Collections";

const { Static, ScrollAndContainerWidth } = composeStories(stories);

describe("Tree", () => {
  it("opens nested expandable single-child items", () => {
    cy.mount(<Static />);

    cy.contains("Foo").click().type("{enter}");
    matchImageSnapshot("Tree-nested-single-child-expansion");
  });

  it("collapses descendant items of a node that is collapsed", () => {
    cy.mount(<Static />);

    cy.contains("List") // "List" item is expanded by default and has expanded children
      .click() // select it
      .type("{enter}") // collapse it
      .type("{enter}"); // collapse expand it. Initially expanded children should now be collapsed
    matchImageSnapshot("Tree-children-collapsed-when-parent-collapsed");
  });

  it('focuses and selects the first item, when autofocus is "first"', () => {
    cy.mount(
      <Tree autoFocus="first" selectionMode="single">
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Tree>
    );
    cy.findAllByRole("treeitem")
      .first()
      .should("have.focus")
      .should("be.selected");
  });

  /**
   * This test makes sure virtualization doesn't affect content width. It's relevant because when virtualization is used
   * items are usually rendered inside absolutely positioned elements, where the width should explicitly be set,
   * instead of implicitly determined based on the content.
   */
  it.skip("takes the necessary width based on the visible item's content", () => {
    // FIXME: the snapshot testing in this case turns out to be too flaky.
    //  Needs more investigation as to why it's flaky, because in real user interactions it doesn't seem to be buggy.
    cy.mount(<ScrollAndContainerWidth />).then(({ rerender }) => {
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      cy.get("[data-testid=tree]").scrollTo(0, 230);
      cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
      cy.get("[data-testid=tree]").scrollTo("right");
      matchImageSnapshot("Tree-horizontal-scrolled-midway");
      cy.get("[data-testid=tree]").scrollTo("bottom");
      matchImageSnapshot("Tree-horizontal-scrolled-all-the-way");
      cy.get("[data-testid=tree]").scrollTo("top", { duration: 100 });
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      rerender(<ScrollAndContainerWidth width={200} />);
      cy.get("[data-testid=tree]").should(beHorizontallyScrollable);
      rerender(<ScrollAndContainerWidth width={300} />);
      cy.get("[data-testid=tree]").should(notBeHorizontallyScrollable);
      matchImageSnapshot("Tree-horizontal-scrolled-resized");
    });
  });

  it("calls onAction for leaves on click or Enter", () => {
    const onAction = cy.stub().as("onAction");
    cy.mount(<Static onAction={onAction} />);

    cy.findByRole("treeitem", { name: "index.ts" }).dblclick();
    cy.get("@onAction").should("be.calledOnceWith", "index.ts");
    cy.findByRole("treeitem", { name: "index.ts" }).type("{enter}");
    cy.get("@onAction").should("be.calledTwice");
  });

  it("doesn't select all when more modifiers than 'cmd' (or 'ctrl' on windows) are pressed", () => {
    cy.mount(<Static />);
    const modifier = isMac() ? "Meta" : "Control";
    cy.findAllByRole("treeitem").first().click();
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "Shift", "a"]);
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "Alt", "a"]);
    cy.findByRole("treeitem", { selected: true }).should("have.length", 1);
    cy.realPress([modifier, "a"]);
    cy.findAllByRole("treeitem", { selected: true }).should("have.length", 12);
  });
});

const notBeHorizontallyScrollable = ($el: Cypress.JQueryWithSelector) => {
  const el = $el.get(0);
  expect(el.scrollWidth).not.to.be.above(
    el.offsetWidth,
    "tree is not scrollable"
  );
};
const beHorizontallyScrollable = ($el: Cypress.JQueryWithSelector) => {
  const el = $el.get(0);
  expect(el.scrollWidth).to.be.above(el.offsetWidth, "tree is scrollable");
};

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
