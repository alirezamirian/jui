import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import React from "react";
import * as stories from "./2-Tabs.stories";

const { Overflow, StaticItems } = composeStories(stories);

describe("Tabs", () => {
  it("passes common dom props to the root element", () => {
    mount(<StaticItems id="tabs" data-foo="bar" />);
    cy.get("#tabs");
    cy.get("[data-foo=bar]");
  });

  it("shows overflowed items in overflow menu", () => {
    mount(<Overflow />);
    matchImageSnapshot("tabs-overflow-menu");
    const arrowDownMenuBtn = cy.get('button[aria-haspopup="true"]');
    arrowDownMenuBtn.should("exist");
    arrowDownMenuBtn.click();
    matchImageSnapshot("tabs-overflow-menu-open");
    cy.get('[role="tab"]').contains("#7").should("not.be.visible");
    cy.get('[role="menuitem"]').contains("#7").click();
    cy.get('[role="tab"]').contains("#7").should("be.visible");
    cy.get('[role="tab"]').contains("#1").should("not.be.visible");
    matchImageSnapshot("tabs-overflow-menu-item-clicked");
  });

  it("shows all tabs when multiRow is set", () => {
    mount(<Overflow multiRow />);
    cy.get('[role="tab"]').contains("#1").should("be.visible");
    cy.get('[role="tab"]').contains("#7").should("be.visible");
    matchImageSnapshot("tabs-multi-row");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.document().toMatchImageSnapshot({
    name: snapshotsName,
    // imageConfig: {
    //   threshold: 0.04, // with current clip boundary, should be less than ~0.04 to detect change in menu item selection
    // },
    // screenshotConfig: {
    //   // since menu and submenu are rendered in overlays, we manually specify a boundary.
    //   // Note that not setting a boundary captures the whole viewport which has a lot of empty space, which drastically
    //   // reduces the diffing sensitivity, and introduces false positives in image snapshot matching.
    //   clip: { x: 0, y: 0, width: 360, height: 120 },
    // },
  });
}
