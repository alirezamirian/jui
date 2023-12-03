import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./StatusBar.stories";

const { Default } = composeStories(stories);

describe("StatusBar", () => {
  it("works!", () => {
    cy.mount(<Default />);
    matchImageSnapshot("StatusBar-default");
  });

  it("prevents focus from getting lost, when clicked", () => {
    cy.mount(
      <>
        <input />
        <div>
          <Default />
        </div>
      </>
    );
    cy.get("input").focus();
    cy.findByTestId("statusbar").click();
    cy.get("input").should("be.focused");
    // test both when the container is clicked and when something inside is clicked.
    cy.findByTestId("statusbar").findByRole("button").click();
    cy.get("input").should("be.focused");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
