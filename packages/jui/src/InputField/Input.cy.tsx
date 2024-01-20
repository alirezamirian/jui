import React from "react";
import { Input, PlatformIcon } from "@intellij-platform/core";

describe("Input", () => {
  it("doesn't allow interactions when disabled", () => {
    cy.mount(<Input disabled />);
    cy.findByRole("textbox").realClick().should("not.have.focus");
  });

  it("supports autofocusing", () => {
    cy.mount(<Input autoFocus />);
    cy.findByRole("textbox").should("have.focus");
  });

  it("can auto select", () => {
    const value = "auto select example";
    cy.mount(<Input autoSelect value={value} />);
    cy.findByRole("textbox").its("0.selectionStart").should("equal", 0);
    cy.findByRole("textbox")
      .its("0.selectionEnd")
      .should("equal", value.length);
  });

  it("focuses the input when icon addons are clicked", () => {
    cy.mount(
      <Input
        addonAfter={
          <PlatformIcon role="button" icon="general/inlineVariables" />
        }
      />
    );
    cy.findByRole("button").realMouseDown();
    cy.findByRole("textbox").should("be.focused");

    // but it should not prevent the default behavior of cursor being moved when clicking a particular position
    // in the input.
    cy.findByRole("textbox").type("some value").realClick({ x: 30, y: 5 });
    cy.findByRole("textbox").its("0.selectionStart").should("equal", 3);
    cy.findByRole("textbox").its("0.selectionEnd").should("equal", 3);
  });

  describe("react API", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      cy.mount(<Input ref={ref} />);
      cy.wrap(ref).its("current").should("be.instanceOf", HTMLInputElement);
    });
  });
});
