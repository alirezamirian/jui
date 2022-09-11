import { mount } from "cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as React from "react";
import * as stories from "./SpeedSearch.stories";

const { Default } = composeStories(stories);

/**
 * Important note: we don't want to test {@link minusculeMatch} logic here. It's the event handling part of speed search
 * that should be tested. Like what should trigger the speed search. what should exit it, and so on.
 * We could have even write this test with @testing-library/react or @testing-library/react-hooks, but this feels
 * safer in terms of testing even handling logic.
 */
describe("SpeedSearch", () => {
  it("works!", () => {
    const onSearchTermChange = cy.stub().as("onSearchTermChange");
    const onActiveChange = cy.stub().as("onActiveChange");
    const resetMocks = () => {
      cy.get("@onSearchTermChange").then((fn: any) => fn.reset());
      cy.get("@onActiveChange").then((fn: any) => fn.reset());
    };
    mount(
      <Default
        onSearchTermChange={onSearchTermChange}
        onActiveChange={onActiveChange}
      />
    );

    // move focus to the speed search container
    cy.contains("Item one").click();
    // typing space should not trigger the search
    cy.realType(" ");
    cy.get("@onSearchTermChange").should("not.have.been.called");
    cy.get("@onActiveChange").should("not.have.been.called");
    resetMocks();
    matchImageSnapshot("SpeedSearch-1-not-active");

    // typing a character should activate the search
    cy.realType("d");
    cy.get("@onSearchTermChange").should("have.been.calledOnceWith", "d");
    cy.get("@onActiveChange").should("have.been.calledOnceWith", true);
    resetMocks();
    matchImageSnapshot("SpeedSearch-2-active");

    // spaces after other characters is allowed and included in the search term.
    cy.realType(" ");
    cy.realType(" ");
    cy.get("@onSearchTermChange").should("have.been.calledWith", "d ");
    cy.get("@onSearchTermChange").should("have.been.calledWith", "d  ");
    resetMocks();
    matchImageSnapshot("SpeedSearch-2-active-2");

    // typing escape should deactivate the search
    cy.realPress("Escape");
    cy.get("@onSearchTermChange").should("have.been.calledOnceWith", "");
    cy.get("@onActiveChange").should("have.been.calledOnceWith", false);
    resetMocks();
    matchImageSnapshot("SpeedSearch-2-deactivated");
  });
});

// noinspection JSUnusedLocalSymbols
function matchImageSnapshot(snapshotsName: string) {
  // No snapshot testing at the moment for SpeedSearch. Saving up on quota, as it doesn't seem necessary.
  // cy.get("svg"); // :( need to manually wait for the svg icon to be loaded.
  // cy.percySnapshot(snapshotsName);
}
