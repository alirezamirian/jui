import * as React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./SpeedSearchMenu.stories";
import { Item, SpeedSearchMenu } from "@intellij-platform/core";

const { Default, WithSections } = composeStories(stories);

describe("SpeedSearchMenu", () => {
  it("lets user filter menu items", () => {
    cy.mount(
      <SpeedSearchMenu>
        <Item>Select in Tree...</Item>
        <Item>Select in Paths...</Item>
        <Item>Select all</Item>
        <Item>Foo</Item>
        <Item>Some very long menu item</Item>
      </SpeedSearchMenu>
    );
    cy.realType("se");
    cy.findByRole("menuitem", { name: "Select all" }).should("exist");
    cy.realType("i");
    cy.findByRole("menuitem", { name: "Select in Tree..." }).should("exist");
    cy.findByRole("menuitem", { name: "Select in Paths..." }).should("exist");
    cy.findByRole("menuitem", { name: "Select all" }).should("not.exist");
    cy.findByRole("menuitem", { name: "Foo" }).should("not.exist");
    cy.findByRole("menuitem", { name: "Some very long menu item" }).should(
      "not.exist"
    );
    matchImageSnapshot("SpeedSearchMenu top level items filtered");
  });

  it("lets user filter menu items in submenus", () => {
    cy.mount(<Default />);
    cy.findByRole("menuitem", { name: "View Mode" }).click();
    cy.findByRole("menuitem", { name: "Float" }).should("exist");
    cy.findByRole("menuitem", { name: "Window" }).should("exist");
    cy.realType("oc");
    cy.findByRole("menuitem", { name: "Undock" }).should("exist");
    cy.findByRole("menuitem", { name: "Docked" }).should("exist");
    cy.findByRole("menuitem", { name: "Float" }).should("not.exist");
    cy.findByRole("menuitem", { name: "Window" }).should("not.exist");
    /**
     * Visual snapshot matching, covering:
     * - Search input appearance
     * - Items being filtered (which is also covered in the checks above)
     * - Search input containing the search keyword
     * - Menu keeping the original size, as the items are filtered
     * - Dividers not being rendered in the beginning or end of the items, or consecutively
     */
    matchImageSnapshot("SpeedSearchMenu submenu items filtered");
  });

  it("moves focus to filtered items only, when arrow keys are used", () => {
    cy.mount(<Default />);
    cy.realType("se");
    cy.findByRole("menuitem", { name: "Select..." }).should("be.focused");
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "Select in Tree..." }).should(
      "be.focused"
    );
    cy.realPress("ArrowDown");
    cy.findByRole("menuitem", { name: "Select..." }).should("be.focused");
    cy.realPress("ArrowUp");
    cy.findByRole("menuitem", { name: "Select in Tree..." }).should(
      "be.focused"
    );
  });

  it("clears and closes search when clear button is pressed", () => {
    cy.mount(<Default />);
    cy.realType("se");
    cy.findByRole("button").click(); // press clear button
    cy.findAllByRole("menuitem").should("have.length", 5);
  });

  it("does not move the focus out from focused item to the menu itself, when the search box is clicked", () => {
    cy.mount(<Default />);
    cy.realType("se");
    cy.contains("se").click(); // force, because pointer-events: none is used in implementation
    cy.focused().debug();
    cy.findByRole("menuitem", { name: "Select..." }).should("be.focused");
  });

  it("doesn't render empty section headers", () => {
    cy.mount(<WithSections />);
    cy.contains("Local Branches").should("exist");
    cy.realType("orig");
    cy.contains("Local Branches").should("not.exist");
  });

  it("renders 'nothing to show' text when there is no hit for the current search", () => {
    // Default emptyText
    cy.mount(<Default />);
    cy.realType("foobar");
    cy.contains("Nothing to show").should("exist");
    /**
     * Visual snapshot matching, covering:
     * - The search input getting red, when there is no match
     * - `emptyText` being rendered properly (also covered in the checks above)
     */
    matchImageSnapshot("SpeedSearchMenu no match");

    // Custom emptyText
    cy.mount(<Default emptyText="Nothing here" />);
    cy.realType("foobar");
    cy.contains("Nothing here").should("exist");
  });

  it("let's options get scrolled if many items are matched with current search", () => {
    cy.mount(
      <SpeedSearchMenu>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
      </SpeedSearchMenu>
    );
    cy.realType("It");
    cy.findByRole("menuitem", { name: "Item 4" }).should("not.be.visible");
    cy.findByRole("menu").scrollTo("bottom");
    cy.findByRole("menuitem", { name: "Item 4" }).should("be.visible");
    cy.contains("It").should("be.visible");
  });

  it("doesn't clear the search when a submenu is opened by keyboard", () => {
    cy.mount(<Default />);
    cy.realType("View").realPress("Enter");
    cy.findAllByRole("menuitem").should("have.length", 5);
    cy.findByRole("menuitem", { name: "All" }).should("not.exist");
    cy.realType("Dock");
    cy.findByRole("menuitem", { name: "Docked" }).focus().realPress("Enter");
    cy.findByRole("menuitem", { name: "Float" }).should("not.exist");
    cy.findAllByRole("menuitem").should("have.length", 5);
  });

  it("doesn't clear the search when a submenu is opened by mouse", () => {
    cy.mount(<Default />);
    cy.realType("View");
    cy.findByRole("menuitem", { name: "View Mode" }).click();
    cy.findAllByRole("menuitem").should("have.length", 5);
    cy.findByRole("menuitem", { name: "All" }).should("not.exist");
    cy.realType("Dock");
    cy.findByRole("menuitem", { name: "Docked" }).click();
    cy.findByRole("menuitem", { name: "Float" }).should("not.exist");
    cy.findAllByRole("menuitem").should("have.length", 5);
  });

  it("Moves focus to the Longest Common Prefix match, if such match exists", () => {
    cy.mount(
      <SpeedSearchMenu>
        <Item>Foo</Item>
        <Item>Bar</Item>
        <Item>New branch from 'master'</Item>
        <Item>Checkout and rebase onto 'feat/SpeedSearchMenu'</Item>
        <Item>Compare</Item>
      </SpeedSearchMenu>
    );
    cy.realType("c");
    // first item
    cy.findAllByRole("menuitem", { name: "New branch from 'master'" }).should(
      "exist"
    );
    cy.findAllByRole("menuitem", {
      name: "Checkout and rebase onto 'feat/SpeedSearchMenu'",
    }).should("have.focus");
    cy.realType("o");
    cy.findAllByRole("menuitem", { name: "Compare" }).should("have.focus");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
