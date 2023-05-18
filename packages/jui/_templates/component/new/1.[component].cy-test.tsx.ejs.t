---
to: src/<%= componentName %>/<%= componentName %>.cy.tsx
---
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./<%= componentName %>.stories";

const { Default } = composeStories(stories);


describe("<%= componentName %>", () => {
  it("works!", () => {
    cy.mount(<Default />);
    matchImageSnapshot("<%= componentName %>-default");
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
