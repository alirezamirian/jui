import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./BalloonManager.stories";
import { createGlobalStyle } from "styled-components";

const { BalloonManagerStory } = composeStories(stories);

const GlobalStyles = createGlobalStyle`
body{
  padding: 10px;
}
`;
const WithGlobalPadding: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <>
    <GlobalStyles />
    {children}
  </>
);

describe("Balloon", () => {
  it("works", () => {
    cy.mount(
      <WithGlobalPadding>
        <BalloonManagerStory />
      </WithGlobalPadding>
    );
    cy.contains("show sticky balloon notification").click();
    matchImageSnapshot("BalloonManager-one-balloon");
    cy.contains("show sticky balloon notification").click();
    matchImageSnapshot("BalloonManager-two-balloons");
    cy.get('[data-testid="close-btn"]')
      .first()
      .click({ force: true /* close button appears only on hover*/ });
    matchImageSnapshot("BalloonManager-one-of-two-closed");

    cy.clock(); // should be called before setTimeout is being called. More info: https://github.com/cypress-io/cypress/issues/5305#issuecomment-539484208
    cy.contains("show auto-hide balloon notification").click();
    cy.get('[data-testid="balloon"]').should("have.length", 2);
    cy.clock().tick(5000); // it doesn't work
    cy.get('[data-testid="balloon"]').should("have.length", 1);
  });
});

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
