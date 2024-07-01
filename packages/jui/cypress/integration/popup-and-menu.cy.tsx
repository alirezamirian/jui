import React from "react";

import {
  Button,
  IconButton,
  Item,
  Menu,
  MenuTrigger,
  PlatformIcon,
  Popup,
  PopupManager,
  PopupTrigger,
  usePopupManager,
} from "@intellij-platform/core";
import { MenuPopupContent } from "@intellij-platform/core/Popup/story-helpers";

describe("Popup and menu integration", () => {
  it("lets user select menu items by mouse", () => {
    const onAction = cy.stub();
    cy.mount(
      <PopupTrigger
        popup={({ close }) => (
          <Popup>
            <MenuPopupContent menuProps={{ onAction, onClose: close }} />
          </Popup>
        )}
      >
        <Button>Open menu</Button>
      </PopupTrigger>
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

  it("supports opening a popup as the action of a menu item", () => {
    const Example = () => {
      const popupManager = usePopupManager();
      return (
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <Menu
              onAction={() => {
                popupManager.show(
                  <Popup>
                    <Popup.Layout
                      content={
                        <Menu>
                          <Item>Menu in popup</Item>
                        </Menu>
                      }
                      header="My popup header"
                    />
                  </Popup>
                );
              }}
              {...menuProps}
              aria-label="Test Menu"
            >
              <Item>Open a popup</Item>
            </Menu>
          )}
        >
          {(triggerProps, ref) => (
            <IconButton
              {...triggerProps}
              preventFocusOnPress={false}
              aria-label="Open menu"
              ref={ref}
            >
              <PlatformIcon icon="general/gearPlain" />
            </IconButton>
          )}
        </MenuTrigger>
      );
    };
    cy.mount(
      <PopupManager>
        <Example />
      </PopupManager>
    );
    cy.findByRole("button", { name: "Open menu" }).click();
    cy.contains("Open a popup").click();
    cy.contains("My popup");
  });
});
