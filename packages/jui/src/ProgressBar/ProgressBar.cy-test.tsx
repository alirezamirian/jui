import React from "react";
import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./ProgressBar.stories";

const { Default, LongDetails } = composeStories(stories);

describe("ProgressBar", () => {
  it("works!", () => {
    mount(<Default />);
    matchImageSnapshot("ProgressBar-default");
  });
  it("limits the length of the detail by progress bar", () => {
    mount(<LongDetails />);
    // The current implementation is not quite accurate, and the screenshot should be updated when that's improved.
    matchImageSnapshot("ProgressBar-long-details");
  });
  it("shows 'paused' in place of the details, when pause icon button is in paused state", () => {
    // TODO
  });

  it("shows icon button tooltip in place of the details, when hovered", () => {
    // TODO
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
