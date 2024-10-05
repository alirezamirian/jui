import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./ComboBox.stories";
import { ComboBox, Item } from "@intellij-platform/core";

const {
  Default,
  Disabled,
  WithDisabledOptions,
  WithNoVisibleLabel,
  WithSection,
  WithError,
  WithWarning,
  WithContextHelp,
  WidthDistribution,
} = composeStories(stories);

const defaultExample = (
  <ComboBox>
    <Item key="start">start</Item>
    <Item key="build">build</Item>
    <Item key="test">test</Item>
    <Item key="deploy">deploy</Item>
  </ComboBox>
);

describe("ComboBox", () => {
  it("looks good", () => {
    cy.viewport(700, 700);
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
        <Default style={{}} />
        <WithError style={{}} />
        <WithWarning style={{}} />
        <WithContextHelp style={{}} />
        <WidthDistribution width={300} />
        <WidthDistribution width={300} />
        <Disabled style={{}} />
        <WithDisabledOptions style={{}} />
      </div>
    );
    cy.findAllByRole("button", { name: /Long label \(flexible width\)/ })
      .last()
      .click();
    cy.findByRole("option", { name: "Long option" }).click();
    cy.findAllByRole("button", { name: /Disabled Options/ })
      .last()
      .click();
    matchImageSnapshot("ComboBox");
  });

  it("can group options in sections", () => {
    cy.mount(<WithSection />);
    cy.findByRole("button").click();
    matchImageSnapshot("ComboBox--sections");
  });

  it("can have invisible label", () => {
    cy.mount(
      <ComboBox aria-label="Scripts">
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("button", {
      name: /Show suggestions/ /* when aria-label is provided, the button is not labeled by it for some reason*/,
    });
  });

  it("can be autofocused", () => {
    cy.mount(
      <ComboBox autoFocus>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("combobox").should("be.focused");
  });

  it("can select a value", () => {
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("button").click();
    cy.findByRole("option", { name: "build" }).click();
    cy.findByRole("listbox").should("not.exist"); // make sure the dropdown menu is closed
    cy.findByRole("combobox").should("have.value", "build");
  });

  it("can select an option using keyboard", () => {
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("button").focus().realPress("Space");
    // The first option is focused when opening via keyboard
    cy.findByRole("listbox");
    cy.realPress("ArrowDown");
    cy.realPress("Enter");
    cy.findByRole("listbox").should("not.exist");
    cy.findByRole("combobox").should("have.value", "build");
  });

  it("does not open the dropdown menu when typing in the input", () => {
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("combobox").type("b");
    cy.findByRole("listbox").should("not.exist");
  });

  it("does not filter the options based on input value by default", () => {
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("combobox").type("x");
    cy.findByRole("button").click();
    cy.findByRole("listbox").findAllByRole("option").should("have.length", 2);
  });

  it("can disable some options", () => {
    cy.mount(
      <ComboBox disabledKeys={["build"]}>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
        <Item key="test">test</Item>
      </ComboBox>
    );
    cy.findByRole("button").click();
    cy.realPress("ArrowDown"); // No option
    cy.realPress("ArrowDown"); // Goes past the disabled option to the next one
    cy.realPress("Enter");
    cy.findByRole("listbox").should("not.exist"); // make sure the dropdown menu is closed
    cy.findByRole("combobox").should("have.value", "test");
  });

  it("closes the dropdown menu by escape", () => {
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("button").click();
    cy.findByRole("listbox").realPress("Escape");
    cy.findByRole("listbox").should("not.exist");
  });

  it("close the popover when tabbing and focus is lost because there is nothing else to get focused", () => {
    // Different from Dropdown, which doesn't close in this situation.
    cy.mount(
      <ComboBox>
        <Item key="start">start</Item>
        <Item key="build">build</Item>
      </ComboBox>
    );
    cy.findByRole("button").click();
    cy.findByRole("listbox"); // should be opened
    cy.realPress("Tab");
    cy.findByRole("listbox").should("not.exist"); // should be closed
  });

  it("closes the popover when tabbing and focus is moved to another element", () => {
    cy.mount(
      <>
        <ComboBox>
          <Item key="start">start</Item>
          <Item key="build">build</Item>
        </ComboBox>
        <input />
      </>
    );
    cy.findByRole("button").click();
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
