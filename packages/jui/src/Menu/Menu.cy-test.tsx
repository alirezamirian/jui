import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./Menu.stories";
import { Menu } from "@intellij-platform/core";

const { Nested, MenuWithTrigger, StaticWithTextItems } = composeStories(
  stories
);

describe("Menu", () => {
  beforeEach(() => {
    // If mouse ends up in a bad position in the previous test suit, it breaks tests here. So we make sure to move
    // mouse out of the way before each test case.
    cy.get("body").realMouseMove(0, 0);
  });

  it("shows arrow in the right position when plain text is used in menu items", () => {
    mount(<StaticWithTextItems />);
    matchImageSnapshot("menu--plain-text-arrow-position");
  });

  it("supports keyboard", () => {
    mount(<Nested />);
    cy.get('[role="menu"]').focused(); // make sure the menu is auto-focused
    cy.realPress("ArrowDown"); // initially menu has focus. This moves focus to the first item.
    testKeyboardNavigation("menu--keyboard-behaviour");
  });

  it("supports mouse", () => {
    mount(<Nested />);
    cy.get("body").click(); // This is necessary because of some implementation details of react-aria. More info in cypress/NOTES.md
    cy.get('[role="menuitem"]').contains("View Mode").realHover(); // open first submenu via hover
    cy.focused().should("have.attr", "role", "menu"); // focus should be on submenu, when opened by hover
    cy.get('[role="menuitem"]').contains("Docked").realHover(); // open second submenu via hover
    cy.get('[role="menuitem"]').contains("UnPinned").realHover(); // Move focus to second item via hover
    matchImageSnapshot("menu--mouse-behaviour-1");
    cy.get('[role="menuitem"]').contains("Float").realHover(); // Close second submenu by hovering another item
    matchImageSnapshot("menu--mouse-behaviour-2");
    cy.get('[role="menuitem"]').contains("Group tabs").realHover(); // Close first submenu by hovering another item
    matchImageSnapshot("menu--mouse-behaviour-3");
  });
});

describe("Menu with trigger", () => {
  it("supports keyboard", () => {
    mount(<MenuWithTrigger />);
    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    testKeyboardNavigation("menu-with-trigger--keyboard-behaviour");
  });

  it("when closed, restores focus to where it was", () => {
    mount(<MenuWithTrigger restoreFocus />);
    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Escape"); // close the menu by pressing escape
    cy.focused().should("have.attr", "aria-haspopup"); // trigger button should now be focused again

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.get("body").click(); // close the menu by clicking outside
    cy.focused().should("have.attr", "aria-haspopup"); // trigger button should now be focused again

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Enter"); // open submenu with enter
    cy.realPress("Escape"); // close the submenu by pressing escape
    cy.realPress("Escape"); // close the menu by pressing escape
    cy.focused().should("have.attr", "aria-haspopup"); // trigger button should now be focused again

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Enter"); // open submenu with enter
    cy.realPress("ArrowDown"); // move focus to the first menu item
    cy.realPress("ArrowDown"); // move focus to the second menu item
    cy.realPress("Enter"); // open second level submenu
    cy.get("body").click(); // close everything by clicking outside
    cy.focused().should("have.attr", "aria-haspopup"); // trigger button should now be focused again
  });

  it("makes sure the menu or submenus are positioned in viewport", () => {
    cy.viewport(375, 375);
    mount(<MenuWithTrigger offsetRight={40} />);
    openSubMenusAndSnapshotTestPosition(1);
    mount(<MenuWithTrigger offsetRight={40} offsetBottom={50} />);
    openSubMenusAndSnapshotTestPosition(2);
    mount(<MenuWithTrigger offsetRight={40} offsetBottom={80} />);
    openSubMenusAndSnapshotTestPosition(3);

    function openSubMenusAndSnapshotTestPosition(num: number) {
      cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
      cy.realPress("Enter"); // open submenu with enter
      cy.realPress("ArrowDown"); // move focus to the first menu item
      cy.realPress("ArrowDown"); // move focus to the first menu item
      cy.realPress("Enter"); // open second level submenu
      matchImageSnapshot(`menu-with-trigger--position-${num}`);
    }
  });
});

/**
 * Assuming menu is open and the first item is focused, it tests the expected keyboard behaviour.
 */
function testKeyboardNavigation(snapshotsName: string) {
  cy.realPress("Enter"); // open submenu with enter
  cy.focused()
    .should("have.attr", "role", "menu")
    .should("contain.text", "Undock"); // focus should now be on the submenu
  cy.realPress("ArrowDown"); // move focus to first item in the submenu
  cy.realPress("ArrowDown"); // move focus to the second item in the submenu

  cy.focused().should("contain.text", "Docked");
  matchImageSnapshot(`${snapshotsName}-1`);

  cy.realPress("ArrowLeft"); // close sub-menu with left arrow
  cy.focused().should("contain.text", "View Mode"); // Focus should now be on the submenu opener item
  matchImageSnapshot(`${snapshotsName}-2`);
  cy.realPress("ArrowRight"); // open submenu with right arrow
  cy.focused().should("have.attr", "role", "menu"); // focus should now be on the submenu
  cy.realPress("ArrowDown"); // move focus to first submenu item
  matchImageSnapshot(`${snapshotsName}-3`);
  cy.realPress("Escape"); // close submenu with escape
  cy.focused().should("contain.text", "View Mode"); // Focus should now be on the submenu opener item
  matchImageSnapshot(`${snapshotsName}-4`);
}

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
