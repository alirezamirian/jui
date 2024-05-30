import React from "react";
import { SearchInput } from "@intellij-platform/core";
import { composeStories } from "@storybook/react";

import * as stories from "./SearchInput.stories";

const { WithAfterAddons } = composeStories(stories);

describe("SearchInput", () => {
  it("clears the input value when the clear button is pressed", () => {
    const onClear = cy.stub();
    cy.mount(<SearchInput onClear={onClear} />);
    cy.findByRole("searchbox").type("search query");
    cy.findByRole("button", { name: "Clear search" }).click();
    cy.findByRole("searchbox").should("have.value", "");
    cy.wrap(onClear).should("be.calledOnceWith", "search query");
  });

  it("clears the input value when Escape is pressed", () => {
    const onClear = cy.stub();
    cy.mount(<SearchInput onClear={onClear} />);
    cy.findByRole("searchbox").type("search query");
    cy.realPress("Escape");
    cy.findByRole("searchbox").should("have.value", "");
    cy.wrap(onClear).should("be.calledOnceWith", "search query");
  });

  it("submits the value when Enter is pressed", () => {
    const onSubmit = cy.stub();
    cy.mount(<SearchInput onSubmit={onSubmit} />);
    cy.findByRole("searchbox").type("search query");
    cy.realPress("Enter");
    cy.wrap(onSubmit).should("be.calledOnceWith", "search query");
  });

  it("renders the clear button before other addons", () => {
    cy.mount(
      <div style={{ padding: "1rem" }}>
        <WithAfterAddons />
      </div>
    );
    matchImageSnapshot("SearchInput-with-other-addons");
  });

  it("keeps the input focused when the clear button is pressed", () => {
    cy.mount(<SearchInput />);
    cy.findByRole("searchbox").type("search query");
    cy.findByRole("button", { name: "Clear search" }).click();
    cy.findByRole("searchbox").should("be.focused");
  });

  it("focuses the input when the clear button is pressed while the input is not already focused", () => {
    cy.mount(<SearchInput defaultValue="search query" />);
    cy.findByRole("button", { name: "Clear search" }).click();
    cy.findByRole("searchbox").should("be.focused");
  });

  describe("with history", () => {
    it("shows search history in a popup menu which is opened when the search icon is clicked", () => {
      cy.mount(
        <div style={{ padding: "1rem" }}>
          <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
        </div>
      );
      cy.findByRole("button", { name: "Recent Search" }).click();
      matchImageSnapshot("SearchInput-with-history-menu-open");
    });

    it("focuses the first item in search history menu, when search history menu is opened", () => {
      cy.mount(
        <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
      );
      cy.findByRole("button", { name: "Recent Search" }).click();
      cy.findByRole("menuitem", { name: "Search query 1" }).should(
        "be.focused"
      );
    });

    it("focuses the input when a history item is selected via mouse", () => {
      cy.mount(
        <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
      );
      cy.findByRole("button", { name: "Recent Search" }).click();
      cy.findByRole("menuitem", { name: "Search query 2" }).click();
      cy.findByRole("searchbox").should("be.focused");
    });

    it("focuses the input when a history item is selected via keyboard", () => {
      cy.mount(
        <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
      );
      cy.findByRole("button", { name: "Recent Search" }).click();
      cy.findByRole("menuitem", { name: "Search query 2" })
        .focus() // focus manually to only test what is meant to be tested in this test case
        .realPress("Enter");
      cy.findByRole("searchbox").should("be.focused");
    });

    it("sets the input value when a history item is selected", () => {
      cy.mount(
        <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
      );
      cy.findByRole("button", { name: "Recent Search" }).click();
      cy.findByRole("menuitem", { name: "Search query 2" }).click();
      cy.findByRole("searchbox").should("have.value", "Search query 2");
    });

    it("opens the search history menu with the right default shortcut (Alt+ArrowDown)", () => {
      cy.mount(
        <SearchInput searchHistory={["Search query 1", "Search query 2"]} />
      );
      cy.findByRole("searchbox").focus().realPress(["Alt", "ArrowDown"]);
      cy.findByRole("menu");
    });

    it("shows the right tooltip on the search icon", () => {
      cy.mount(
        <SearchInput
          historyButtonTitle="Search History"
          searchHistory={["Search query 1", "Search query 2"]}
        />
      );
      workaroundHoverIssue();
      cy.findByRole("button", { name: "Search History" }).realHover();
      cy.findByRole("tooltip").should("contain", "Search History");
    });
  });
});

/**
 * Workaround for @react-aria/interaction issues with `realHover`. Read more in packages/jui/cypress/NOTES.md
 */
function workaroundHoverIssue() {
  cy.get("body").realHover();
}

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
