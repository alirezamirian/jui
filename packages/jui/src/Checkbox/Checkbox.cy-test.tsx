import { mount } from "@cypress/react";
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Checkbox.stories";

const { Default } = composeStories(stories);

const CHECKBOX_LABEL_TEXT = "Enable";

describe("Checkbox", () => {
  it("works!", () => {
    cy.intercept(
      "GET",
      "https://raw.githubusercontent.com/JetBrains/intellij-community/master/platform/platform-impl/src/com/intellij/ide/ui/laf/icons/darcula/*",
      (req) => {
        const fileName = req.url.split("/").pop();
        req.reply({
          statusCode: 200, // default
          fixture: `laf/icons/darcula/${fileName}`,
        });
      }
    );
    mount(
      <div id="component-container">
        <Default />
      </div>
    );
    matchImageSnapshot("Checkbox-unchecked");
    cy.contains(CHECKBOX_LABEL_TEXT).click();

    matchImageSnapshot("Checkbox-checked-and-focused");
  });

  it("renders the checkbox in selected state if defaultSelected is set", () => {
    mount(
      <div id="component-container">
        <Default defaultSelected />
      </div>
    );
    matchImageSnapshot("Checkbox-checked");
  });

  it("supports excludeFromTabOrder", () => {
    mount(
      <div id="component-container">
        <input id="dummyInput" />
        <Default />
      </div>
    );
    cy.get("#dummyInput").focus(); // tabbing to the text input
    cy.realPress("Tab"); // next tab should move focus to the checkbox
    cy.focused().should("have.attr", "type", "checkbox");

    mount(
      <div id="component-container">
        <input id="dummyInput" />
        <Default excludeFromTabOrder />
      </div>
    );
    cy.get("#dummyInput").focus(); // tabbing to the text input
    cy.realPress("Tab"); // next tab should not focus the checkbox since excludeFromTabOrder is passed
    cy.focused().should("not.exist");
  });

  it("supports preventFocus", () => {
    mount(
      <div id="component-container">
        <Default preventFocus />
      </div>
    );
    cy.contains(CHECKBOX_LABEL_TEXT).click();
    cy.focused().should("not.exist");
    matchImageSnapshot("Checkbox-checked-2");
  });

  it("supports isIndeterminate", () => {
    const onChange = cy.stub();
    mount(
      <div id="component-container">
        <Default isIndeterminate onChange={onChange} />
      </div>
    );
    // clicking checkbox should still call the onChange with toggled value
    // but the indeterminate state should be displayed regardless of the checked state
    cy.contains(CHECKBOX_LABEL_TEXT).click();
    cy.wrap(onChange).should("be.calledWith", true);
    matchImageSnapshot("Checkbox-indeterminate-1");

    cy.contains(CHECKBOX_LABEL_TEXT).click();
    cy.wrap(onChange).should("be.calledWith", false);
    matchImageSnapshot("Checkbox-indeterminate-2");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("svg"); // :( need to manually wait for the svg icon to be loaded.
  cy.percySnapshot(snapshotsName);
}