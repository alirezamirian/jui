import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./Dropdown.stories";

const {
  Default,
  WidthDistribution,
  Disabled,
  WithDisabledOptions,
  WithNoVisibleLabel,
  WithSection,
  WithCustomOptions,
  Invalid,
} = composeStories(stories);

describe("Dropdown", () => {
  it("looks good", () => {
    cy.mount(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "start",
          padding: ".5rem",
        }}
      >
        <Default />
        <Invalid />
        <WidthDistribution width={210} />
        <WidthDistribution width={210} />
        <Disabled />
        <WithDisabledOptions />
      </div>
    );
    cy.findAllByRole("button", { name: /Long label \(flexible width\)/ })
      .last()
      .click();
    cy.findByRole("option", { name: "Long option" }).click();
    cy.findAllByRole("button", { name: /With Disabled Options/ })
      .last()
      .click();
    matchImageSnapshot("Dropdown");
  });

  it("can have an icon in options", () => {
    cy.mount(<WithCustomOptions />);
    cy.findByRole("button").click();
    matchImageSnapshot("Dropdown--custom-options");
  });

  it("can group options in sections", () => {
    cy.mount(<WithSection />);
    cy.findByRole("button").click();
    matchImageSnapshot("Dropdown--sections");
  });

  it("can have invisible label", () => {
    cy.mount(<WithNoVisibleLabel />);
    cy.findByRole("button", { name: /Output level/ });
  });

  it("can select a value", () => {
    cy.mount(<Default />);
    cy.findByRole("button").click();
    cy.findByRole("option", { name: "Warning" }).click();
    cy.findByRole("listbox").should("not.exist"); // make sure the dropdown menu is closed
    cy.contains("Warning");
  });

  it("can select an option with using keyboard", () => {
    cy.mount(<Default />);
    cy.findByRole("button").focus();
    cy.realPress("Space");
    cy.findByRole("listbox");
    cy.realPress("ArrowDown");
    cy.realPress("Enter");
    cy.findByRole("listbox").should("not.exist");
    cy.contains("Warning");
  });

  it("can disable some options", () => {
    cy.mount(<WithDisabledOptions />);
    cy.findByRole("button").click();
    cy.realPress("ArrowUp"); // Goes up to "Warning"
    cy.realPress("ArrowUp"); // Doesn't go higher up than the last non-disabled option, "Warning"
    cy.realPress("Enter");
    cy.findByRole("listbox").should("not.exist"); // make sure the dropdown menu is closed
    cy.contains("Warning");
  });

  it("closes the dropdown menu by escape", () => {
    cy.mount(<Default />);
    cy.findByRole("button").click();
    cy.findByRole("listbox").realPress("Escape");
    cy.findByRole("listbox").should("not.exist");
  });

  it("does not close the popover when tabbing and focuses is lost because there is nothing else to get focused", () => {
    cy.mount(<Default />);
    cy.contains("Info").click();
    cy.findByRole("listbox"); // should be opened
    cy.realPress("Tab");
    cy.findByRole("listbox").should("exist"); // should be closed
    // see the reasoning here: https://github.com/adobe/react-spectrum/pull/4931
  });

  it("closes the popover when tabbing and focus is moved to another element", () => {
    cy.mount(
      <>
        <Default />
        <input />
      </>
    );
    cy.contains("Info").click();
    cy.findByRole("listbox"); // should be opened
    cy.realPress("Tab");
    cy.get("input").should("be.focused");
    cy.findByRole("listbox").should("not.exist"); // should be closed
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
