import { composeStories } from "@storybook/react";
import * as React from "react";
import * as stories from "./Menu.stories";
import {
  ContextMenuContainer,
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  Theme,
  ThemeProvider,
} from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";
import { Section } from "@react-stately/collections";

const {
  Static,
  Nested,
  MenuWithTrigger,
  StaticWithTextItems,
  ContextMenu,
  ToggleSubmenuOnPress,
  SubmenuWithAction,
  Sections,
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

  it("aligns text of items with or without icon", () => {
    cy.mount(
      <Menu>
        <Item textValue="MenuItemLayout with icon">
          <MenuItemLayout
            icon={<PlatformIcon icon={"actions/menu-cut"} />}
            content="MenuItemLayout with icon"
            shortcut={"⌘X"}
          />
        </Item>
        <Item textValue="MenuItemLayout without icon">
          <MenuItemLayout
            content="MenuItemLayout without icon"
            shortcut={"⌘Y"}
          />
        </Item>
        <Item>Plain text content</Item>
      </Menu>
    );
    matchImageSnapshot("menu--text-alignment--icon");
  });

  it("avoid extra padding when no item has icon", () => {
    cy.mount(
      <Menu>
        <Item textValue="MenuItemLayout without icon">
          <MenuItemLayout
            content="MenuItemLayout without icon"
            shortcut={"⌘Y"}
          />
        </Item>
        <Item>Plain text content</Item>
      </Menu>
    );
    matchImageSnapshot("menu--text-alignment--no-icon");
  });

  it("sets the expected aria attributes on menu items with nested menu", () => {
    cy.mount(<Nested />);
    cy.findByRole("menuitem", { name: "View Mode", expanded: false }).should(
      "have.attr",
      "aria-haspopup",
      "menu"
    );
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
    cy.findByRole("menuitem", { name: "View Mode" }).realHover(); // open first submenu via hover
    cy.findByRole("menu", { name: "View Mode" }).should("have.focus"); // focus should be on submenu, when opened by hover
    cy.findByRole("menuitem", { name: "View Mode" }).click(); // clicking the parent menu item, should not move focus back to it.
    cy.findByRole("menu", { name: "View Mode" }).should("have.focus"); // focus should be on submenu, when opened by hover
    cy.findByRole("menuitem", { name: "Docked" }).realHover(); // open second submenu via hover
    cy.findByRole("menuitem", { name: "UnPinned" }).realHover(); // Move focus to second item via hover
    matchImageSnapshot("menu--mouse-behaviour-1");
    cy.findByRole("menuitem", { name: "Float" })
      .realHover() // Close second submenu by hovering another item
      .should("have.focus"); // The new hovered item should now be focused
    matchImageSnapshot("menu--mouse-behaviour-2");
    cy.findByRole("menuitem", { name: "Group tabs" })
      .realHover() // Close first submenu by hovering another item
      .should("have.focus"); // The new hovered item should now be focused

    matchImageSnapshot("menu--mouse-behaviour-3");
  });

  it("doesn't steel focus from opened submenu, when hovered", () => {
    cy.mount(<Nested disabledKeys={[]} />);
    cy.get("body").click(); // This is necessary because of some implementation details of react-aria. More info in cypress/NOTES.md
    cy.findByRole("menuitem", { name: "View Mode" }).realHover(); // open first submenu via hover
    cy.findByRole("menu", { name: "View Mode" }).should("have.focus"); // submenu should be focused
    cy.findByRole("menuitem", { name: "Undock" }).realHover(); // move focus to some menu item in the submenu
    cy.findByRole("menuitem", { name: "View Mode" }).realHover(); // hover the parent menu item again
    cy.findByRole("menuitem", { name: "Undock" }).should("have.focus"); // the focused item in the submenu should still be focused
  });

  it("restores focus to parent menu item, when submenu is closed", () => {
    cy.mount(<Nested />);
    cy.findByRole("menuitem", { name: "View Mode" }).realHover();
    cy.findByRole("menu", { name: "View Mode" }).should("have.focus");
    cy.realPress("ArrowLeft");
    cy.findByRole("menuitem", { name: "View Mode" }).should("have.focus");
  });

  it("focuses menu when there is a selected item, even in nested menus", () => {
    cy.mount(<Nested autoFocus selectedKeys={["Pinned"]} />);
    cy.findByRole("menu").should("have.focus");
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

  it("Doesn't render empty sections", () => {
    cy.mount(<Sections />);
    cy.contains("Empty section").should("not.exist");
  });

  it("closes the submenu when sibling items in are hovered, in a section", () => {
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

  it("scrolls items focused item into viewport, if needed", () => {
    cy.mount(
      <div style={{ height: 100 }}>
        <Static fillAvailableSpace />
      </div>
    );
    cy.findByRole("menuitem", { name: "Reformat Code" }).focus();
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "Optimize Imports" }).should(
      "be.visible"
    );
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "Delete" }).should("be.visible");
  });

  it('focuses the first item, when autofocus is "first"', () => {
    cy.mount(<Nested autoFocus="first" />);
    cy.findByRole("menuitem", { name: "View Mode" }).should("have.focus");
    cy.realPress("Enter");
    cy.findByRole("menuitem", { name: "Undock" }).should("have.focus");
  });

  it("focuses the opened submenu, when selectedKeys has value", () => {
    // a test case to cover a fix for an issue in the current implementation of @react-aria/menu
    // The issue is whenever selectedKeys is non-empty, the opened submenu is not autofocused,
    // in an attempt to focus the selected item. But even if that behavior is expected (which is not
    // the case in the Intellij implementation, at least), the selected keys may belong not to the
    // opened submenu. We have a workaround for this which autofocuses the menu, if autofocus is not
    // "first" or "last"
    cy.mount(<Nested selectedKeys={["Pinned"]} />);
    cy.findByRole("menuitem", { name: "View Mode" })
      .focus()
      .realPress("ArrowRight");
    cy.findByRole("menu", { name: "View Mode" })
      .should("be.visible")
      .should("have.focus");
  });

  it("shows the active state for parent menu item of a currently opened submenu, even when not hovered", () => {
    cy.mount(
      <div style={{ paddingTop: 50 }}>
        <Nested />
      </div>
    );
    cy.findByRole("menuitem", { name: "View Mode" }).realHover(); // open submenu
    matchImageSnapshot("menu-submenu-parent-hovered"); // "View Mode" should be styled active
    cy.findByRole("menuitem", { name: "View Mode" }).realMouseMove(0, -5); // Moving mouse outside the item, but inside the menu
    matchImageSnapshot("menu-submenu-parent-hovered"); // "View Mode" should still be styled active
    cy.findByRole("menuitem", { name: "View Mode" }).realMouseMove(0, -30); // Moving mouse outside the menu
    matchImageSnapshot("menu-submenu-parent-hovered"); // "View Mode" should still be styled active
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

    it("doesn't focus items on hover, when a submenu is open and focused", () => {
      cy.mount(<ToggleSubmenuOnPress autoFocus />);
      // Open submenu
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      // Hover a menu item in outside the currently opened submenu, and expect the focus not to move to it
      cy.findByRole("menuitem", { name: "Group tabs" })
        .realHover()
        .should("not.have.focus");
      cy.findByRole("menu", { name: "View Mode" }).should("have.focus");
    });

    it("keeps the focused item of the parent menu, when submenu is closed", () => {
      cy.mount(<ToggleSubmenuOnPress />);
      const performTest = () => {
        cy.findByRole("menuitem", { name: "View Mode" }).realClick();
        cy.findByRole("menuitem", { name: "Group tabs" }).realHover();
        cy.realPress("ArrowLeft");
        cy.findByRole("menuitem", { name: "Group tabs" }).should("have.focus");
      };
      performTest();
      performTest(); // performing test twice, to avoid some false positives in local development environment.
    });

    it("focuses the last opened (sub-)menu on hover, even if the menu is not focused", () => {
      cy.mount(<ToggleSubmenuOnPress autoFocus={false} />);
      // Testing on top level menu
      cy.findByRole("menu").should("not.have.focus");
      cy.findByRole("menuitem", { name: "Group tabs" })
        .realHover()
        .should("have.focus");

      // Testing on a submenu
      cy.findByRole("menuitem", { name: "View Mode" }).click(); // let the submenu open
      cy.get("body").click("bottomRight"); // let the menu lose the focus
      cy.findByRole("menuitem", { name: "Float" })
        .realHover()
        .should("have.focus");
    });

    it("shows the hovered item as active even if another sibling has submenu open", () => {
      cy.mount(<ToggleSubmenuOnPress />);
      cy.findByRole("menuitem", { name: "View Mode" }).realClick();
      cy.findByRole("menuitem", { name: "Docked" }).realClick();
      cy.findByRole("menuitem", { name: "Group tabs" }).realHover(); // Hovering an item in parent menus
      cy.findByRole("menuitem", { name: "Float" }).realHover(); // Hovering an item in parent menus
      matchImageSnapshot("menu-submenu-parent-sibling-hovered");
      cy.findByRole("menu", { name: "Docked" }).should("have.focus"); // But the submenu should keep the focus
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

    it("opens and focuses the submenu when right arrow is pressed", () => {
      cy.mount(<SubmenuWithAction />);
      cy.findByRole("menuitem", { name: "View Mode" }).focus();
      cy.realPress("ArrowRight");
      cy.findByRole("menu", { name: "View Mode" })
        .should("be.visible")
        .should("have.focus");
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

    it("doesn't focus items on hover, when a submenu is open and focused", () => {
      cy.mount(<SubmenuWithAction autoFocus />);
      // Open submenu
      cy.findByRole("menuitem", { name: "View Mode" })
        .findByRole("button")
        .click();
      // Hover a menu item in outside the currently opened submenu, and expect the focus not to move to it
      cy.findByRole("menuitem", { name: "Group tabs" })
        .realHover()
        .should("not.have.focus");
      cy.findByRole("menu", { name: "View Mode" }).should("have.focus");
    });

    it("focuses top level items on hover, when there is no submenu opened, even if the menu is not focused", () => {
      cy.mount(<SubmenuWithAction autoFocus={false} />);
      cy.findByRole("menu").should("not.have.focus");
      cy.findByRole("menuitem", { name: "Group tabs" })
        .realHover()
        .should("have.focus");
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
    cy.findByRole("menu", { name: "View Mode" }).should("have.focus"); // focus should now be on the submenu
    cy.realPress("ArrowDown"); // move focus to first submenu item
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-3`);
    cy.realPress("Escape"); // close submenu with escape
    cy.focused().should("not.exist"); // The menu should be closed
    matchImageSnapshot(`menu-with-trigger--keyboard-behaviour-4`);
  });

  it("doesn't open multiple submenus open, when parent items are in sections", () => {
    cy.mount(
      <Menu aria-label="Test Menu">
        <Section title="section 1">
          <Item title="S1. Item 1">
            <Item>S1. Item 1.1</Item>
            <Item>S1. Item 1.2</Item>
          </Item>
          <Item title="S1. Item 2">
            <Item>S1. Item 2.1</Item>
            <Item>S1. Item 2.2</Item>
          </Item>
        </Section>
        <Section title="section 2">
          <Item title="S2. Item 1">
            <Item>S2. Item 1.1</Item>
            <Item>S2. Item 1.2</Item>
          </Item>
          <Item>S2. Item 2</Item>
        </Section>
      </Menu>
    );
    cy.findByRole("menuitem", { name: "S1. Item 1" }).click();
    cy.findByRole("menuitem", { name: "S2. Item 1" }).click();
    cy.findAllByRole("menu").should("have.length", 2); // Only parent menu and one submenu should be opened

    cy.findByRole("menuitem", { name: "S1. Item 1" }).click();
    cy.findByRole("menuitem", { name: "S1. Item 2" }).click();
    cy.findAllByRole("menu").should("have.length", 2); // Only parent menu and one submenu should be opened
  });

  it("supports keyboard when sections and dividers are used", () => {
    cy.mount(
      <Menu>
        <Item title="Group 1">
          <Item>G1. Item 1</Item>
          <Divider />
          <Item>G1. Item 2</Item>
          <Section title="section 1">
            <Item>G1. S1. Item 1</Item>
          </Section>
        </Item>
        <Divider />
        <Section title="section 1">
          <Item>S1. Item 1</Item>
        </Section>
        <Section title="section 2">
          <Item>S2. Item 1</Item>
        </Section>
      </Menu>
    );
    cy.findByRole("menuitem", { name: "Group 1" }).focus().should("have.focus");

    cy.realPress("Enter"); // Going to first level menu to check navigation
    cy.findByRole("menuitem", { name: "G1. Item 1" })
      .focus()
      .should("have.focus");
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "G1. Item 2" }).should("have.focus");
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "G1. S1. Item 1" }).should("have.focus");

    cy.realPress("ArrowLeft"); // back to first level menu
    cy.findByRole("menuitem", { name: "Group 1" }).should("have.focus");
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "S1. Item 1" }).should("have.focus");
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "S2. Item 1" }).should("have.focus");
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

  it("closes when right clicking outside", () => {
    // TODO: fix the issue!
    cy.mount(<MenuWithTrigger />);
    cy.get("button[aria-haspopup]").click(); // open the menu by clicking the trigger.
    cy.get("body").rightclick("bottomRight");
    cy.findByRole("menu").should("not.exist");
  });
});

describe("ContextMenu", () => {
  it("opens in the right position when mouse is not moved yet at all", () => {
    cy.mount(<ContextMenu />);
    // cy.rightClick() command is not suitable for this test case as it triggers some mousemove events before
    // triggering the contextmenu event.
    cy.get("#context-menu-container").trigger("contextmenu", {
      clientX: 100,
      clientY: 200,
      force: true, // Ensure this action is not prevented by other event listeners
    });

    cy.findByRole("menu")
      .invoke("offset")
      .its("left")
      .should("be.approximately", 100, 10);

    cy.findByRole("menu")
      .invoke("offset")
      .its("top")
      .should("be.approximately", 200, 10);
  });

  it("works when right clicking on the context menu trigger area while already open", () => {
    cy.mount(<ContextMenu />);
    cy.get("#context-menu-container").rightclick(150, 150, {
      scrollBehavior: false,
    });
    cy.get("#context-menu-container").rightclick(100, 100, {
      scrollBehavior: false,
    });
    cy.findByRole("menu").should("be.focused");
  });

  it("doesn't position menu in a way that first item would get automatically hovered and focused", () => {
    cy.mount(<ContextMenu />);
    cy.get("#context-menu-container").rightclick(100, 100, {
      scrollBehavior: false,
    });
    // the menu is focused, not the menu item.
    cy.findByRole("menu").should("be.focused");
  });

  it("opens in the right position", () => {
    // NOTE: currently menu positioning doesn't exactly match the reference implementation. It flips instead of move
    // to viewport.
    cy.mount(<ContextMenu />);
    cy.scrollTo("bottom", { duration: 0 });
    cy.get("#context-menu-container")
      .realMouseMove(0, 0) // this fixes a flakiness in screenshots, which depends on whether other test cases are run before this
      .rightclick("bottomRight", {
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

  it("is closed when right clicking outside the context menu trigger area", () => {
    cy.mount(<ContextMenu noScroll />);
    cy.get("#context-menu-container").rightclick(150, 150, {
      scrollBehavior: false,
    });
    cy.get("body").rightclick(10, 10, {
      scrollBehavior: false,
    });
    cy.findByRole("menu").should("not.exist");
  });

  it("is closed when right clicking on another context menu trigger area", () => {
    const renderMenu = () => (
      <Menu aria-label="Test Context Menu">
        <Item>Menu item</Item>
      </Menu>
    );
    cy.mount(
      <>
        <ContextMenuContainer renderMenu={renderMenu}>
          Container 1
        </ContextMenuContainer>
        <ContextMenuContainer renderMenu={renderMenu}>
          Container 2
        </ContextMenuContainer>
      </>
    );
    cy.contains("Container 1").rightclick();
    cy.contains("Container 2").rightclick("left");
    cy.findAllByRole("menu").should("have.length", 1);
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

  it("lets user select nested menu items by mouse", () => {
    const onAction = cy.stub();
    cy.mount(<ContextMenu menuProps={{ onAction }} />);
    cy.get("#context-menu-container")
      // Not sure why but this extra click here became
      // necessary for test to pass, after some refactoring.
      // Without it, clicking "Show History" doesn't work, and realClicking it
      // will also not trigger onAction, only the first time the menu is opened.
      // The issue wasn't reproducible in real interaction.
      .click()
      .rightclick("top", {
        scrollBehavior: false,
      });
    cy.findByRole("menuitem", { name: "Local History" }).click();
    cy.findByRole("menuitem", { name: "Show History" }).click();

    cy.wrap(onAction).should("be.calledOnce");
  });

  it("disables the scroll of the document when the menu is open", () => {
    cy.mount(
      <>
        <div style={{ height: "10rem" }} id="element-above" />
        <ContextMenuContainer
          id="container"
          style={{
            height: "100vh",
            overflow: "auto",
            background: "#aaa",
          }}
          renderMenu={() => (
            <Menu aria-label="Test Context Menu">
              <Item>Menu item</Item>
            </Menu>
          )}
        >
          scrollable container
          <div style={{ height: "150vh" }}></div>
        </ContextMenuContainer>
      </>
    );
    cy.get("#container").rightclick("top", {
      scrollBehavior: false,
    });
    cy.window()
      .its("scrollY")
      .then((scrollBefore) => {
        cy.get("#element-above").realMouseWheel({
          deltaY: 5,
          scrollBehavior: false, //  we don't want cypress to do any extra scrolling
        });
        cy.wait(200); // maybe a bug in realMouseWheel, but before the wait, the next command runs before scrolling happens
        cy.window()
          .its("scrollY")
          .then((scrollAfter) => {
            expect(scrollAfter).to.eq(scrollBefore);
          });
      });
  });

  it("disables the scroll when the menu is open", () => {
    const onScroll = cy.stub().as("onScroll");
    cy.mount(
      <ContextMenuContainer
        id="container"
        onScroll={onScroll}
        style={{ height: "100vh", overflow: "auto", background: "#aaa" }}
        renderMenu={() => (
          <Menu aria-label="Test Context Menu">
            <Item>Menu item</Item>
          </Menu>
        )}
      >
        <div style={{ height: "200vh" }}></div>
      </ContextMenuContainer>
    );
    cy.get("#container").rightclick("left", {
      scrollBehavior: false,
    });
    cy.findByRole("menu");
    cy.get("#container").realMouseWheel({
      deltaY: 5,
      scrollBehavior: false, //  we don't want cypress to do any extra scrolling
    });
    cy.wait(200); // maybe a bug in realMouseWheel, but before the wait, the next command runs before scrolling happens
    cy.wrap(onScroll).should("not.be.called");
  });

  it("disables the scroll of the scrollable parent when the menu is open", () => {
    const onScroll = cy.stub().as("onScroll");
    cy.mount(
      <ContextMenuContainer
        id="container"
        style={{ height: "100vh", overflow: "auto", background: "#aaa" }}
        renderMenu={() => (
          <Menu aria-label="Test Context Menu">
            <Item>Menu item</Item>
          </Menu>
        )}
      >
        <div style={{ height: "100vh", overflow: "auto" }} onScroll={onScroll}>
          <div style={{ height: "200vh" }}></div>
        </div>
      </ContextMenuContainer>
    );
    cy.get("#container").rightclick("left", {
      scrollBehavior: false,
    });
    cy.findByRole("menu");
    cy.get("#container").realMouseWheel({
      deltaY: 5,
      scrollBehavior: false, //  we don't want cypress to do any extra scrolling
    });
    cy.wait(200); // maybe a bug in realMouseWheel, but before the wait, the next command runs before scrolling happens
    cy.wrap(onScroll).should("not.be.called");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
