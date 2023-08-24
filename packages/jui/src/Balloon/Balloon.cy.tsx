import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./Balloon.stories";
import { createGlobalStyle } from "styled-components";

const {
  Default,
  LongTitle,
  WithoutTitle,
  WithoutBody,
  WithoutActions,
  WithoutBodyAndActions,
  ShortBody,
} = composeStories(stories);

const GlobalStyles = createGlobalStyle`
body{
  padding: 10px;
}
`;
const WithGlobalPadding: React.FC = ({ children }) => (
  <>
    <GlobalStyles />
    {children}
  </>
);

describe("Balloon", () => {
  it("looks as expected", () => {
    cy.mount(
      <WithGlobalPadding>
        <Default />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-default");
    cy.get('[data-testid="expand-btn"]').click();
    matchImageSnapshot("Balloon-default-expanded");
    cy.mount(
      <WithGlobalPadding>
        <LongTitle />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-long-title");
    cy.contains("Maven Projects").parent().realHover();
    matchImageSnapshot("Balloon-long-title-hover"); // the shadow for header actions
    cy.mount(
      <WithGlobalPadding>
        <WithoutTitle />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-without-title");
    cy.mount(
      <WithGlobalPadding>
        <WithoutBody />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-without-body");
    cy.mount(
      <WithGlobalPadding>
        <WithoutActions />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-without-actions");
    cy.mount(
      <WithGlobalPadding>
        <WithoutBodyAndActions />
      </WithGlobalPadding>
    );
    matchImageSnapshot("Balloon-without-body-and-actions");
  });

  it("doesn't show the expand button when body is not provided or is not long enough, even when `expanded` is false", () => {
    cy.mount(<ShortBody />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    cy.mount(<WithoutBody />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    cy.mount(<ShortBody expanded={false} />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");

    cy.mount(<Default />);
    cy.get('[data-testid="expand-btn"]').should("exist");
  });

  it("expands when clicked anywhere on the body, including the spacing around it", () => {
    const checkClickExpands = (...args: Parameters<typeof cy["click"]>) => {
      cy.mount(
        <WithGlobalPadding>
          <Default data-testid="balloon" />
        </WithGlobalPadding>
      );
      cy.get("[data-testid=balloon]").click(...args);
      cy.get('[data-testid="collapse-btn"]').should("exist");
      cy.get('[data-testid="expand-btn"]').should("not.exist");
    };

    // @ts-expect-error for some reason Parameters<typeof cy["click"]> doesn't seem to work properly 🤷‍
    checkClickExpands("center"); // at the center of the balloon's body
    checkClickExpands(1, 30); // on the right edge of the balloon's body
    checkClickExpands(370, 30); // on the left edge of the balloon's body
  });

  it("collapses when clicked anywhere on the footer, including the spacing around it", () => {
    const checkClickCollapses = (...args: Parameters<typeof cy["click"]>) => {
      cy.mount(
        <WithGlobalPadding>
          <Default data-testid="balloon" defaultExpanded />
        </WithGlobalPadding>
      );
      cy.get("[data-testid=balloon]").click(...args);
      cy.get('[data-testid="expand-btn"]').should("exist");
      cy.get('[data-testid="collapse-btn"]').should("not.exist");
    };
    checkClickCollapses(1, 150);
    checkClickCollapses(80, 150);
    checkClickCollapses(370, 150);
  });

  it("doesn't collapse when clicked on links in the footer", () => {
    cy.mount(
      <WithGlobalPadding>
        <Default data-testid="balloon" defaultExpanded />
      </WithGlobalPadding>
    );
    cy.get("a, [role=link]").contains("Import changes").click();
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    cy.get('[data-testid="collapse-btn"]').should("exist");
  });

  it("it doesn't show the collapse button, if body is not long enough, even when `expanded` is true", () => {
    cy.mount(
      <WithGlobalPadding>
        <ShortBody expanded />
      </WithGlobalPadding>
    );
    cy.get('[data-testid="expand-btn"]').should("not.exist");
  });

  it("it should render close button only when onClose is passed", () => {
    cy.mount(
      <WithGlobalPadding>
        <Default />
      </WithGlobalPadding>
    );
    cy.get("[data-testid=close-btn]").should("exist");
    cy.mount(
      <WithGlobalPadding>
        <Default onClose={undefined} />
      </WithGlobalPadding>
    );
    cy.get("[data-testid=close-btn]").should("not.exist");
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
