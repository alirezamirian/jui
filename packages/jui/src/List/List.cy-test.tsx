import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./List.stories";

const { Default } = composeStories(stories);

describe("List", () => {
  it("renders as expected", () => {
    cy.mount(<Default />);
    matchImageSnapshot("List-default");
  });

  it.skip("supports keyboard navigation", () => {
    // TODO
  });

  it("calls onAction for items on click or Enter", () => {
    const onAction = cy.stub().as("onAction");
    cy.mount(<Default onAction={onAction} />);

    cy.contains("Vicente Amigo").dblclick();
    cy.get("@onAction").should("be.calledOnceWith", "Vicente Amigo");
    cy.contains("Vicente Amigo").type("{enter}");
    cy.get("@onAction").should("be.calledTwice");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.percySnapshot(snapshotsName);
}
