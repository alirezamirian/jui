import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./Checkbox.stories";
import { Checkbox } from "./Checkbox";

const { Default } = composeStories(stories);

const CHECKBOX_LABEL_TEXT = "Enable";

describe("Checkbox", () => {
  it("works!", () => {
    cy.mount(
      <div id="component-container">
        <Default />
      </div>
    );
    matchImageSnapshot("Checkbox-unchecked");
    cy.contains(CHECKBOX_LABEL_TEXT).click();

    // svg is already loaded, so the workaround in matchImageSnapshot won't work :/ can be removed when icons loading
    // in tests is improved in general
    cy.wait(50);
    matchImageSnapshot("Checkbox-checked-and-focused");
  });

  it("renders the checkbox in selected state if defaultSelected is set", () => {
    cy.mount(
      <div id="component-container">
        <Default defaultSelected />
      </div>
    );
    matchImageSnapshot("Checkbox-checked");
  });

  it("supports excludeFromTabOrder", () => {
    cy.mount(
      <div id="component-container">
        <input id="dummyInput" />
        <Default />
      </div>
    );
    cy.get("#dummyInput").focus(); // tabbing to the text input
    cy.realPress("Tab"); // next tab should move focus to the checkbox
    cy.findByRole("checkbox").should("be.focused");

    cy.mount(
      <div id="component-container">
        <input id="dummyInput" />
        <Default excludeFromTabOrder />
      </div>
    );
    cy.get("#dummyInput").focus(); // tabbing to the text input
    cy.realPress("Tab"); // next tab should not focus the checkbox since excludeFromTabOrder is passed
    cy.findByRole("checkbox").should("not.be.focused");
  });

  it("supports preventFocus", () => {
    cy.mount(
      <div id="component-container">
        <input autoFocus id="another-input" />
        <Default preventFocus />
      </div>
    );
    // make sure the text input has focus initially
    cy.focused().should("have.id", "another-input");
    cy.contains(CHECKBOX_LABEL_TEXT).click();
    // focus should stay where it was before clicking checkbox. It's important that not only the checkbox is not
    // focused, but also the focus is not changed after interaction with the checkbox.
    cy.focused().should("have.id", "another-input");
    matchImageSnapshot("Checkbox-checked-2");
  });

  it("supports isIndeterminate", () => {
    const onChange = cy.stub();
    cy.mount(
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

  it("supports mnemonic", () => {
    const onChange = cy.stub();
    cy.mount(
      <Checkbox onChange={onChange} mnemonic="d">
        Don't ask again
      </Checkbox>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(onChange).should("be.calledOnceWith", true);
    cy.findByRole("checkbox", { checked: true });
  });

  it("can't be changed by mnemonic if disabled", () => {
    const onChange = cy.stub();
    cy.mount(
      <Checkbox isDisabled onChange={onChange} mnemonic="d">
        Don't ask again
      </Checkbox>
    );
    cy.window().focus();
    cy.realPress(["Alt", "d"]);
    cy.wrap(onChange).should("not.be.calledOnceWith", true);
    cy.findByRole("checkbox", { checked: false });
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
