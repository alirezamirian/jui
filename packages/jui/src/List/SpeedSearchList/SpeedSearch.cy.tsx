import { composeStories } from "@storybook/react";
import * as React from "react";
import * as stories from "./SpeedSearchList.stories";

const { WithHighlight, WithConnectedInput } = composeStories(stories);

describe("SpeedSearchList", () => {
  it("renders as expected", () => {
    cy.mount(<WithHighlight />);
    cy.findByRole("grid").focus().realType("g");
    cy.findAllByRole("row").should("have.length", 9);
    matchImageSnapshot("SpeedSearchList-searched");
  });

  it("calls onAction for items on click or Enter", () => {
    const onAction = cy.stub().as("onAction");
    cy.mount(<WithHighlight onAction={onAction} />);

    cy.contains("Vicente Amigo").dblclick();
    cy.get("@onAction").should("be.calledOnceWith", "Vicente Amigo");
    cy.contains("Vicente Amigo").type("{enter}");
    cy.get("@onAction").should("be.calledTwice");
  });

  describe("Connection to input", () => {
    it("supports keyboard navigation by arrow up and down", () => {
      cy.mount(<WithConnectedInput />);
      cy.contains("Paco de Lucia").click();
      cy.findByRole("row", { name: "Paco de Lucia", selected: true });
      cy.get("input").focus().type("abc").realPress("ArrowDown");
      cy.findByRole("row", { name: "Paco de Lucia", selected: false });
      cy.findByRole("row", { name: "Vicente Amigo", selected: true });
      cy.realPress("ArrowUp");
      cy.findByRole("row", { name: "Paco de Lucia", selected: true });
      // Cursor should not be jumped to start, by arrow up
      cy.get("input").its("0").its("selectionStart").should("equal", 3);
      cy.get("input").its("0").its("selectionEnd").should("equal", 3);
    });
    it("supports onAction by pressing Enter", () => {
      const onAction = cy.stub();
      cy.mount(<WithConnectedInput onAction={onAction} />);
      cy.findByRole("row", { name: "Paco de Lucia", selected: true });
      cy.get("input").focus().type("abc");
      cy.realPress("Enter");
      cy.wrap(onAction).should("have.been.calledOnceWith", "Paco de Lucia");
    });
    it("has behavior consistency with the list", () => {
      cy.mount(<WithConnectedInput shouldFocusWrap />);
      cy.findByRole("row", { name: "Paco de Lucia", selected: true });
      cy.get("input").focus().type("abc");
      cy.findAllByRole("row").last().click();
      cy.realPress("ArrowDown");
      cy.findAllByRole("row")
        .first()
        .should("have.attr", "aria-selected", "true");
    });
    it("works as expected when empty selection is not allowed and the first item is auto-selected", () => {
      cy.mount(
        <WithConnectedInput
          allowEmptySelection={
            false /* false by default, but to make this test case not depend on that */
          }
        />
      );
      cy.get("input").focus().realPress("ArrowDown");
      cy.findByRole("row", { name: "Paco de Lucia", selected: false });
      // Make sure the first item is also set as focused item and pressing arrow down selects the second item.
      // This is particularly important here as the list is not focused to get a chance to autofocus the selected item.
      cy.findByRole("row", { name: "Vicente Amigo", selected: true });
    });
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.percySnapshot(snapshotsName);
}
