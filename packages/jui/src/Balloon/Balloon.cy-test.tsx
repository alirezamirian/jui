import { mount } from "cypress/react";
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Balloon.stories";

const {
  Default,
  LongTitle,
  WithoutTitle,
  WithoutBody,
  WithoutActions,
  WithoutBodyAndActions,
  ShortBody,
} = composeStories(stories);

const styles = "body{padding: 10px}";

describe("Balloon", () => {
  it("looks as expected", () => {
    mount(<Default />, { styles });
    matchImageSnapshot("Balloon-default");
    cy.get('[data-testid="expand-btn"]').click();
    matchImageSnapshot("Balloon-default-expanded");
    mount(<LongTitle />, { styles });
    matchImageSnapshot("Balloon-long-title");
    cy.contains("Maven Projects").parent().realHover();
    matchImageSnapshot("Balloon-long-title-hover"); // the shadow for header actions
    mount(<WithoutTitle />, { styles });
    matchImageSnapshot("Balloon-without-title");
    mount(<WithoutBody />, { styles });
    matchImageSnapshot("Balloon-without-body");
    mount(<WithoutActions />, { styles });
    matchImageSnapshot("Balloon-without-actions");
    mount(<WithoutBodyAndActions />, { styles });
    matchImageSnapshot("Balloon-without-body-and-actions");
  });

  it("doesn't show the expand button when body is not provided or is not long enough, even when `expanded` is false", () => {
    mount(<ShortBody />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    mount(<WithoutBody />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    mount(<ShortBody expanded={false} />);
    cy.get('[data-testid="expand-btn"]').should("not.exist");

    mount(<Default />);
    cy.get('[data-testid="expand-btn"]').should("exist");
  });

  it("expands when clicked anywhere on the body, including the spacing around it", () => {
    const checkClickExpands = (...args: Parameters<typeof cy["click"]>) => {
      mount(<Default data-testid="balloon" />, { styles });
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
      mount(<Default data-testid="balloon" defaultExpanded />, { styles });
      cy.get("[data-testid=balloon]").click(...args);
      cy.get('[data-testid="expand-btn"]').should("exist");
      cy.get('[data-testid="collapse-btn"]').should("not.exist");
    };
    checkClickCollapses(1, 150);
    checkClickCollapses(80, 150);
    checkClickCollapses(370, 150);
  });

  it("doesn't collapse when clicked on links in the footer", () => {
    mount(<Default data-testid="balloon" defaultExpanded />, { styles });
    cy.get("a, [role=link]").contains("Import changes").click();
    cy.get('[data-testid="expand-btn"]').should("not.exist");
    cy.get('[data-testid="collapse-btn"]').should("exist");
  });

  it("it doesn't show the collapse button, if body is not long enough, even when `expanded` is true", () => {
    mount(<ShortBody expanded />, { styles });
    cy.get('[data-testid="expand-btn"]').should("not.exist");
  });

  it("it should render close button only when onClose is passed", () => {
    mount(<Default />, { styles });
    cy.get("[data-testid=close-btn]").should("exist");
    mount(<Default onClose={undefined} />, { styles });
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
