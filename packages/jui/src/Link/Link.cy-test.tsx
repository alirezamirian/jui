import { mount } from "cypress/react";
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Link.stories";

const { Default } = composeStories(stories);

describe("Link", () => {
  it("works!", () => {
    const onPress = cy.stub();
    mount(<Default onPress={onPress} />);
    matchImageSnapshot("Link-default");
    cy.contains("Open something something").click();
    mount(<Default isDisabled />);
    matchImageSnapshot("Link-disabled");
    cy.contains("Open something something").click();
    cy.wrap(onPress).should("have.been.calledOnce");
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
