import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./Menu.stories";
import { Item, Menu, Theme, ThemeProvider } from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";

const { Nested, MenuWithTrigger, StaticWithTextItems, ContextMenu } =
  composeStories(stories);

describe("Menu", () => {
  beforeEach(() => {
    // If mouse ends up in a bad position in the previous test suit, it breaks tests here. So we make sure to move
    // mouse out of the way before each test case.
    cy.get("body").realMouseMove(450, 450);
  });

  it("shows arrow in the right position when plain text is used in menu items", () => {
    cy.mount(<StaticWithTextItems />);
    matchImageSnapshot("menu--plain-text-arrow-position");
  });

  it("supports keyboard", () => {
    cy.mount(<Nested />);
    cy.get('[role="menu"]').focused(); // make sure the menu is auto-focused
    cy.realPress("ArrowDown"); // initially menu has focus. This moves focus to the first item.
    cy.realPress("Enter"); // open submenu with enter
    cy.focused()
      .should("have.attr", "role", "menu")
      .should("contain.text", "Undock"); // focus should now be on the submenu
    cy.realPress("ArrowDown"); // move focus to first item in the submenu
    cy.realPress("ArrowDown"); // move focus to the second item in the submenu

    cy.focused().should("contain.text", "Docked");
    matchImageSnapshot(`menu--keyboard-behaviour-1`);

    cy.realPress("ArrowLeft"); // close sub-menu with left arrow
    cy.focused().should("contain.text", "View Mode"); // Focus should now be on the submenu opener item
    matchImageSnapshot(`menu--keyboard-behaviour-2`);
    cy.realPress("ArrowRight"); // open submenu with right arrow
    cy.focused().should("have.attr", "role", "menu"); // focus should now be on the submenu
    cy.realPress("ArrowDown"); // move focus to first submenu item
    matchImageSnapshot(`menu--keyboard-behaviour-3`);
    cy.realPress("Escape"); // close submenu with escape
    cy.focused().should("contain.text", "View Mode"); // Focus should now be on the submenu opener item
    matchImageSnapshot(`menu--keyboard-behaviour-4`);
  });

  it("supports mouse", () => {
    cy.mount(<Nested />);
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

  it("closes previously opened submenu, when a new submenu opens", () => {
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <Menu>
          <Item title="Item 1">
            <Item>Item 1-1</Item>
            <Item>Item 1-2</Item>
            <Item>Item 1-3</Item>
          </Item>
          <Item title="Item 2">
            <Item>Item 2-1</Item>
            <Item>Item 2-2</Item>
            <Item>Item 2-3</Item>
          </Item>
        </Menu>
      </ThemeProvider>
    );
    cy.findByRole("menuitem", { name: "Item 1" }).realHover();
    cy.findByRole("menuitem", { name: "Item 2" }).realHover();
    cy.findByRole("menu", { name: "Item 2" }).should("be.visible");
    cy.findByRole("menu", { name: "Item 1" }).should("not.exist");
  });
});

describe("Menu with trigger", () => {
  beforeEach(() => {
    // If mouse ends up in a bad position in the previous test suit, it breaks tests here. So we make sure to move
    // mouse out of the way before each test case.
    cy.get("body").realMouseMove(450, 450);
  });
  function testFocusRestoration(assertFocused: () => void) {
    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Escape"); // close the menu by pressing escape
    assertFocused();

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.get("body").click(); // close the menu by clicking outside
    assertFocused();

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Enter"); // open submenu with enter
    cy.realPress("Escape"); // close the submenu by pressing escape
    cy.realPress("Escape"); // close the menu by pressing escape
    assertFocused();

    cy.get("button[aria-haspopup]").realClick(); // open the menu by clicking the trigger.
    cy.realPress("Enter"); // open submenu with enter
    cy.realPress("ArrowDown"); // move focus to the first menu item
    cy.realPress("ArrowDown"); // move focus to the second menu item
    cy.realPress("Enter"); // open second level submenu
    cy.get("body").click(); // close everything by clicking outside
    assertFocused();
  }
  it("supports keyboard", () => {
    cy.mount(<MenuWithTrigger />);
    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.realPress("ArrowDown"); // move focus to first item in the submenu
    cy.realPress("Enter"); // open submenu with enter
    cy.focused()
      .should("have.attr", "role", "menu")
      .should("contain.text", "Undock"); // focus should now be on the submenu
    cy.realPress("ArrowDown"); // move focus to first item in the submenu
    cy.realPress("ArrowDown"); // move focus to the second item in the submenu

    cy.focused().should("contain.text", "Docked");
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-1`);

    cy.realPress("ArrowLeft"); // close sub-menu with left arrow
    cy.focused().should("contain.text", "View Mode"); // Focus should now be on the submenu opener item
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-2`);
    cy.realPress("ArrowRight"); // open submenu with right arrow
    cy.focused().should("have.attr", "role", "menu"); // focus should now be on the submenu
    cy.realPress("ArrowDown"); // move focus to first submenu item
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-3`);
    cy.realPress("Escape"); // close submenu with escape
    cy.focused().should("not.exist"); // The menu should be
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-4`);
  });

  it.only("when closed, restores focus to the previously focused element, by default", () => {
    cy.mount(
      <div>
        <button autoFocus>focused element</button>
        <MenuWithTrigger />
      </div>
    );
    testFocusRestoration(() => {
      cy.focused().should("contain", "focused element");
    });
  });

  it("when closed, restores focus to the trigger if preventFocusOnPress is false", () => {
    cy.mount(<MenuWithTrigger restoreFocus preventFocusOnPress={false} />);
    testFocusRestoration(() => {
      cy.focused().should("have.attr", "aria-haspopup"); // trigger button should now be focused again
    });
  });

  it("makes sure the menu or submenus are positioned in viewport", () => {
    cy.viewport(375, 375);
    cy.mount(<MenuWithTrigger offsetRight={40} />);
    openSubMenusAndSnapshotTestPosition(1);
    cy.mount(<MenuWithTrigger offsetRight={40} offsetBottom={50} />);
    openSubMenusAndSnapshotTestPosition(2);
    cy.mount(<MenuWithTrigger offsetRight={40} offsetBottom={80} />);
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

describe("ContextMenu", () => {
  it("opens in the right position", () => {
    // NOTE: currently menu positioning doesn't exactly match the reference implementation. It flips instead of move
    // to viewport.
    cy.mount(<ContextMenu />);
    cy.scrollTo("bottom", { duration: 0 });
    cy.get("#context-menu-container").rightclick("bottomRight", {
      scrollBehavior: false,
    });
    matchImageSnapshot(`'context-menu-opened'`);
    cy.get("#context-menu-container").rightclick("topLeft", {
      scrollBehavior: false,
    });
  });

  it("is closed by escape key", () => {
    cy.mount(<ContextMenu />);
    cy.scrollTo("bottom", { duration: 0 });
    cy.get("#context-menu-container").rightclick("center", {
      scrollBehavior: false,
    });
    cy.get("[role=menu]");
    cy.realPress("Escape");
    cy.get("[role=menu]").should("not.exist");
  });

  it("is closed by clicking outside", () => {
    cy.mount(<ContextMenu />);
    cy.scrollTo("bottom", { duration: 0 });
    cy.get("#context-menu-container").rightclick("center", {
      scrollBehavior: false,
    });
    cy.get("[role=menu]");
    cy.get("#context-menu-container").click("topLeft");
    cy.get("[role=menu]").should("not.exist");
  });

  it("is closed after an action is triggered", () => {
    cy.mount(<ContextMenu />);
    cy.scrollTo("bottom", { duration: 0 });
    cy.get("#context-menu-container").rightclick("center", {
      scrollBehavior: false,
    });
    cy.contains("Generate").click();
    cy.get("[role=menu]").should("not.exist");
  });

  it("restores focus when closed", () => {
    cy.mount(
      <ContextMenu>
        <button autoFocus>button</button>
      </ContextMenu>
    );
    cy.scrollTo("bottom", { duration: 0 });
    cy.contains("button").rightclick("center", {
      scrollBehavior: false,
    });
    cy.realPress("{esc}");
    cy.contains("button").should("have.focus");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
