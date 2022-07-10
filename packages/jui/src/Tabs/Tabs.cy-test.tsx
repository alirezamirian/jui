/// <reference types="cypress-plugin-snapshots" />
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

  it("makes sure selected tab is scrolled into view as expected", () => {
    cy.viewport(520, 520);
    mount(
      <div>
        <div style={{ height: 200 }} />
        <Overflow maxWidth={520} />
        <div style={{ height: 1200 }} />
      </div>
    );
    // We should make sure whatever "scroll into view" logic we have, doesn't mess with the page's scroll
    const assertPageNotScrolled = () =>
      cy.window().its("scrollY").should("equal", 0);

    // Local visual testing turned out problematic. switching to percy, at least for this test case
    const compareSnapshot = (name: string) => {
      cy.get("[data-loading-icon]").should("not.exist");
      cy.percySnapshot(name);
    };

    assertPageNotScrolled();

    // Clicking on an overflowed tab, from the menu, should scroll it enough so that it's aligned to the end
    cy.get('button[aria-haspopup="true"]').click({ scrollBehavior: false });
    cy.get('[role="menuitem"]').contains("#7").click({ scrollBehavior: false });
    assertPageNotScrolled();
    compareSnapshot("tabs-selected-tab-scrolled-into-view-aligned-to-end");

    // Clicking on half shown tab, at the start, should scroll it enough so that it's aligned to the start
    cy.get('[role="tab"]')
      .contains("#4")
      .click("right", { scrollBehavior: false });
    assertPageNotScrolled();
    compareSnapshot("tabs-selected-tab-scrolled-into-view-aligned-to-start");

    // Clicking on half shown tab, at the end, should scroll it enough so that it's aligned to the end
    cy.get('[role="tab"]')
      .contains("#7")
      .click("left", { scrollBehavior: false });
    assertPageNotScrolled();
    compareSnapshot("tabs-selected-tab-scrolled-into-view-aligned-to-end");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
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
