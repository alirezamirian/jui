import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./BalloonProvider.stories";

const { BalloonsProviderStory } = composeStories(stories);

const styles = "body{padding: 10px}";

describe("Balloon", () => {
  it("works", () => {
    cy.mount(<BalloonsProviderStory />, { styles });
    cy.contains("show sticky balloon notification").click();
    matchImageSnapshot("BalloonProvider-one-balloon");
    cy.contains("show sticky balloon notification").click();
    matchImageSnapshot("BalloonProvider-two-balloons");
    cy.get('[data-testid="close-btn"]')
      .first()
      .click({ force: true /* close button appears only on hover*/ });
    matchImageSnapshot("BalloonProvider-one-of-two-closed");

    cy.clock(); // should be called before setTimeout is being called. More info: https://github.com/cypress-io/cypress/issues/5305#issuecomment-539484208
    cy.contains("show auto-hide balloon notification").click();
    cy.get('[data-testid="balloon"]').should("have.length", 2);
    cy.clock().tick(5000); // it doesn't work
    cy.get('[data-testid="balloon"]').should("have.length", 1);
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
