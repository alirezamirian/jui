import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./StatusBar.stories";

const { Default } = composeStories(stories);

describe("StatusBar", () => {
  it("works!", () => {
    cy.mount(<Default />);
    matchImageSnapshot("StatusBar-default");
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
