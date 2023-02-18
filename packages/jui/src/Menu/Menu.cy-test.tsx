import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./Menu.stories";
import {
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  Theme,
  ThemeProvider,
} from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";
import { Section } from "@react-stately/collections";

const {
  Nested,
  MenuWithTrigger,
  StaticWithTextItems,
  ContextMenu,
  ToggleSubmenuOnPress,
  SubmenuWithAction,
} = composeStories(stories);

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
    cy.mount(<Nested autoFocus />);
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
    cy.mount(<Nested disabledKeys={[]} />);
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

  it("calls onAction and onClose when items are pressed by mouse", () => {
    const onAction = cy.stub();
    const onClose = cy.stub();
    cy.mount(<Nested onAction={onAction} onClose={onClose} />);
    cy.findByRole("menuitem", { name: "Group tabs" }).click();
    cy.wrap(onAction).should("be.calledOnceWith", "Group tabs");
    cy.wrap(onClose).should("be.calledOnce");
  });

  it("doesn't call onAction and onClose when disable items are pressed by mouse", () => {
    const onAction = cy.stub();
    const onClose = cy.stub();
    cy.mount(
      <Nested
        onAction={onAction}
        onClose={onClose}
        disabledKeys={["Group tabs"]}
      />
    );
    cy.findByRole("menuitem", { name: "Group tabs" }).click();
    cy.wrap(onAction).should("not.be.called");
    cy.wrap(onClose).should("not.be.called");
  });

  it("calls onAction and onClose when items are pressed by keyboard", () => {
    const onAction = cy.stub();
    const onClose = cy.stub();
    cy.mount(<Nested onAction={onAction} onClose={onClose} />);
    cy.findByRole("menuitem", { name: "Group tabs" }).focus();
    cy.realPress("Enter");
    cy.wrap(onAction).should("be.calledOnceWith", "Group tabs");
    cy.wrap(onClose).should("be.calledOnce");
  });

  it("supports any sections and dividers inside nested menus", () => {
    cy.mount(
      <Menu aria-label="Nested menu with sections and dividers">
        <Section title="Section 1">
          <Item
            textValue="Item 1-1"
            title={<MenuItemLayout content="Item 1-1" />}
          >
            <Item>Item 1-2</Item>
            <Divider />
            <Item title="Item 1-3">
              <Item>Item 1-3.1</Item>
              <Divider />
              <Item>Item 1-3.2</Item>
              <Item>Item 1-3.3</Item>
            </Item>
            <Item>Item 1-4</Item>
          </Item>
        </Section>
      </Menu>
    );
    cy.findByRole("menuitem", { name: "Item 1-1" }).realHover();
    cy.findByRole("menuitem", { name: "Item 1-3" }).realHover();
  });

  it("submenu is closed when sibling items in are hovered, in a section", () => {
    cy.mount(
      <Menu aria-label="Nested menu with sections and dividers">
        <Section title="Section 1">
          <Item
            textValue="Section 1 - Item 1"
            title={<MenuItemLayout content="Section 1 - Item 1" />}
          >
            <Item>Section 1 - Item 1-1</Item>
          </Item>
          <Item>Section 1 - Item 2</Item>
        </Section>
        <Item>Item 2</Item>
      </Menu>
    );
    cy.findByRole("menuitem", { name: "Section 1 - Item 1" }).realHover(); // let the submenu open
    // Hovering an item within the same section, should close the submenu
    cy.findByRole("menuitem", { name: "Section 1 - Item 2" }).realHover();
    cy.findAllByRole("menu").should("have.length", 1);

    cy.findByRole("menuitem", { name: "Section 1 - Item 1" }).realHover(); // let the submenu open
    // Hovering an item outside the section
    cy.findByRole("menuitem", { name: "Item 2" }).realHover();
    cy.findAllByRole("menu").should("have.length", 1);
  });

  describe("submenuBehavior=toggleOnPress", () => {
    it("doesn't open the submenu on hover, when submenuBehavior is toggleOnPress", () => {
      cy.mount(<ToggleSubmenuOnPress />);
      cy.findByRole("menuitem", { name: "View Mode" }).realHover();
      cy.findByRole("menuitem", { name: "Undock" }).should("not.exist");
    });

    it("toggles the submenu when the parent menu item is pressed by mouse", () => {
      cy.mount(<ToggleSubmenuOnPress />);
      cy.findByRole("menuitem", { name: "View Mode" }).click();
      cy.findByRole("menuitem", { name: "Docked" })
        .should("be.visible")
        .click();
      cy.findByRole("menuitem", { name: "Pinned" }).should("be.visible");
    });

    it("doesn't toggle the submenu when a disabled parent menu item is pressed by mouse", () => {
      const onAction = cy.stub();
      const onClose = cy.stub();
      cy.mount(
        <Nested
          onAction={onAction}
          onClose={onClose}
          disabledKeys={["View Mode"]}
        />
      );
      cy.findByRole("menuitem", { name: "View Mode" }).click();
      cy.findByRole("menuitem", { name: "Docked" }).should("not.exist");
    });

    it("toggles the submenu when the parent menu item is pressed by keyboard", () => {
      const onClose = cy.stub();
      const onAction = cy.stub();
      cy.mount(<ToggleSubmenuOnPress onClose={onClose} onAction={onAction} />);
      cy.findByRole("menuitem", { name: "View Mode" }).focus();
      cy.realPress("Enter");
      cy.findByRole("menuitem", { name: "Undock" }).should("be.visible");
      cy.findByRole("menu", { name: "View Mode" }).should("have.focus");
      cy.realPress("ArrowDown").realPress("ArrowDown");
      cy.realPress("Enter");
      cy.findByRole("menu", { name: "Docked" }).should("have.focus");
      cy.realPress("ArrowDown").realPress("Enter");
      cy.wrap(onAction).should("have.been.calledOnceWith", "Pinned");
      cy.wrap(onClose).should("have.been.calledOnce");

      cy.mount(<ToggleSubmenuOnPress />);
      cy.findByRole("menuitem", { name: "View Mode" }).focus();
      cy.realPress("Space");
      cy.findByRole("menuitem", { name: "Undock" }).should("be.visible");
      cy.findByRole("menu", { name: "View Mode" }).should("have.focus");
    });

    it("doesn't trigger action when the parent menu item is pressed", () => {
      const onAction = cy.stub();
      cy.mount(<ToggleSubmenuOnPress onAction={onAction} />);
      cy.findByRole("menuitem", { name: "View Mode" }).click();
      cy.wrap(onAction).should("not.be.called");
    });

    it("toggles the submenu when the right chevron arrow is clicked", () => {
      cy.mount(<ToggleSubmenuOnPress />);
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      cy.findByRole("menuitem", { name: "Docked" }).should("be.visible");
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      cy.findByRole("menuitem", { name: "Docked" }).should("not.exist");
    });
  });

  describe("submenuBehavior=actionOnPress", () => {
    it("doesn't open the submenu on hover, when submenuBehavior is actionOnPress", () => {
      cy.mount(<SubmenuWithAction />);
      cy.findByRole("menuitem", { name: "View Mode" }).realHover();
      cy.findByRole("menuitem", { name: "Undock" }).should("not.exist");
    });

    it("triggers action when items with submenu are pressed by keyboard", () => {
      const onAction = cy.stub();
      const onClose = cy.stub();
      cy.mount(<SubmenuWithAction onAction={onAction} onClose={onClose} />);
      cy.findByRole("menuitem", { name: "View Mode" }).focus();
      cy.realPress("Enter");
      cy.wrap(onAction).should("be.calledOnceWith", "View Mode");
      cy.wrap(onClose).should("be.calledOnce");
      cy.findAllByRole("menu").should("have.length", 1); // submenu should not be opened
    });

    it("triggers action when items with submenu are pressed by mouse", () => {
      const onAction = cy.stub();
      const onClose = cy.stub();
      cy.mount(<SubmenuWithAction onAction={onAction} onClose={onClose} />);
      cy.findByRole("menuitem", { name: "View Mode" }).realHover().click();
      cy.wrap(onAction).should("be.calledOnceWith", "View Mode");
      cy.wrap(onClose).should("be.calledOnce");
      cy.findAllByRole("menu").should("have.length", 1); // submenu should not be opened
    });

    it("triggers action when items without submenu are pressed by mouse", () => {
      const onAction = cy.stub();
      const onClose = cy.stub();
      cy.mount(<SubmenuWithAction onAction={onAction} onClose={onClose} />);
      cy.findByRole("menuitem", { name: "Group tabs" }).click();
      cy.wrap(onAction).should("be.calledOnceWith", "Group tabs");
      cy.wrap(onClose).should("be.calledOnce");
    });

    it("opens the submenu when right arrow is pressed", () => {
      cy.mount(<SubmenuWithAction />);
      cy.mount(<SubmenuWithAction />);
      cy.findByRole("menuitem", { name: "View Mode" }).focus();
      cy.realPress("ArrowRight");
      cy.findByRole("menuitem", { name: "Docked" }).should("be.visible");
    });

    it("doesn't trigger action when the right chevron arrow is pressed", () => {
      cy.mount(<SubmenuWithAction />);
      const onAction = cy.stub();
      const onClose = cy.stub();
      cy.mount(<SubmenuWithAction onAction={onAction} onClose={onClose} />);
      cy.findByRole("menuitem", { name: "View Mode" })
        .realHover()
        .findAllByRole("button")
        .click();
      cy.wrap(onAction).should("not.be.called");
      cy.wrap(onClose).should("not.be.called");
    });

    it("toggles the submenu when the right chevron arrow is clicked", () => {
      cy.mount(<SubmenuWithAction />);
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      cy.findByRole("menuitem", { name: "Docked" }).should("be.visible");
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      cy.findByRole("menuitem", { name: "Docked" }).should("not.exist");
    });
  });
});

describe("Menu with trigger", () => {
  beforeEach(() => {
    // If mouse ends up in a bad position in the previous test suit, it breaks tests here. So we make sure to move
    // mouse out of the way before each test case.
    cy.get("body").realMouseMove(450, 450);
  });

  describe("autofocus", () => {
    // Autofocus could be tested in "Menu" test suite as well, but we have a beforeEach block, clicking on the background.
    it("autofocuses the menu by default", () => {
      cy.mount(<MenuWithTrigger />);
      cy.findByRole("button").click();
      cy.findByRole("menu").should("have.focus");
    });
    it('focuses the first item, when autofocus is "first"', () => {
      cy.mount(<MenuWithTrigger menuProps={{ autoFocus: "first" }} />);
      cy.findByRole("button").click();
      cy.findByRole("menuitem", { name: "View Mode" }).should("have.focus");
    });
    it('focuses the last item, when autofocus is "last"', () => {
      cy.mount(<MenuWithTrigger menuProps={{ autoFocus: "last" }} />);
      cy.findByRole("button").click();
      cy.findByRole("menuitem", { name: "Group tabs" }).should("have.focus");
    });

    // autoFocus=false doesn't work for some reason at the moment
    it.skip("doesn't autofocus the menu if autofocus is false", () => {
      cy.mount(<MenuWithTrigger menuProps={{ autoFocus: false }} />);
      cy.findByRole("button").click();
      cy.findByRole("menu").should("not.have.focus");
      cy.findAllByRole("menuitem").should("not.have.focus");
    });
  });
  function testFocusRestoration(assertFocused: () => void) {
    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.realPress("Escape"); // close the menu by pressing escape
    assertFocused();

    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.get("body").click(); // close the menu by clicking outside
    assertFocused();

    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.realPress("Enter"); // open submenu with enter
    cy.realPress("Escape"); // close the menu by pressing escape
    assertFocused();

    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.realPress("ArrowDown"); // move focus to the first menu item
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
    cy.focused().should("not.exist"); // The menu should be closed
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-4`);
  });

  it("when closed, restores focus to the previously focused element, by default", () => {
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
      cy.findByRole("menu").focus();
      cy.realPress("ArrowDown"); // move focus to the first menu item
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
    matchImageSnapshot("context-menu-opened");
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
