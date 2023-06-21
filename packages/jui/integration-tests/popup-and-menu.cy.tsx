import React from "react";

import { Button, PopupOnTrigger } from "@intellij-platform/core";
import { MenuPopupContent } from "../src/Popup/story-helpers";

describe("Popup and menu integration", () => {
  it("lets user select menu items by mouse", () => {
    const onAction = cy.stub();
    cy.mount(
      <PopupOnTrigger trigger={<Button>Open menu</Button>}>
        {({ close }) => (
          <MenuPopupContent menuProps={{ onAction, onClose: close }} />
        )}
      </PopupOnTrigger>
    );

    // First level menu items
    cy.findByRole("button").click();
    cy.findAllByRole("menuitem").first().click();
    cy.wrap(onAction).should("be.calledOnce");

    // Nested menu item
    cy.findByRole("button").click();
    cy.findByRole("menuitem", { expanded: false, name: ".ignore File" })
      .first()
      .click();
    cy.findByRole("menu", { name: "Nested menu item" })
      .findAllByRole("menuitem")
      .first()
      .click();
    cy.wrap(onAction).should("be.calledTwice");
  });
});
