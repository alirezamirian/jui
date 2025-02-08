import { composeStories } from "@storybook/react";
import * as stories from "./ThreeViewSplitter.stories";

const { WithoutInitialSize, WithFocusableContent } = composeStories(stories);
describe("ThreeViewSplitter", () => {
  it("can resize the views", () => {
    cy.mount(<WithoutInitialSize />);
    cy.get('[data-testid="first"]')
      .resizeFromSide("right", 50)
      .invoke("outerWidth")
      .should("be.closeTo", 94, 2);

    cy.get('[data-testid="last"]')
      .resizeFromSide("left", 50)
      .invoke("outerWidth")
      .should("be.closeTo", 94, 2);
  });

  it("doesn't steal the focus when resize handles are being dragged", () => {
    cy.mount(<WithFocusableContent />);
    cy.get("input").should("be.focused");
    cy.get('[data-testid="first"]').resizeFromSide("right", 50);
    cy.get("input").should("be.focused");
  });
});
