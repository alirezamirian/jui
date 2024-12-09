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
    cy.get("[aria-busy=true]").should("not.exist");
    cy.findByRole("button").realMouseDown();
    cy.findByRole("textbox").should("be.focused");

    // but it should not prevent the default behavior of cursor being moved when clicking a particular position
    // in the input.
    cy.findByRole("textbox").type("some value").realClick({ x: 30, y: 5 });
    cy.findByRole("textbox").its("0.selectionStart").should("equal", 3);
    cy.findByRole("textbox").its("0.selectionEnd").should("equal", 3);
  });

  describe("react API", () => {
    it("forwards ref to the container div element", () => {
      const ref = React.createRef<HTMLInputElement>();
      cy.mount(<Input ref={ref} />);
      cy.wrap(ref).its("current").should("be.instanceOf", HTMLDivElement);
    });

    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      cy.mount(<Input inputRef={ref} />);
      cy.wrap(ref).its("current").should("be.instanceOf", HTMLInputElement);
    });

    it("doesn't stop propagation of keyboard events", () => {
      const onKeyDown = cy.stub();
      const onKeyUp = cy.stub();
      const onParentKeyDown = cy.stub();
      const onParentKeyUp = cy.stub();
      cy.mount(
        <div onKeyDown={onParentKeyDown} onKeyUp={onParentKeyUp}>
          <Input onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
        </div>
      );
      cy.get("input").focus().type("a");
      cy.wrap(onKeyDown).should("be.calledOnce");
      cy.wrap(onKeyUp).should("be.calledOnce");
      cy.wrap(onParentKeyDown).should("be.calledOnce");
      cy.wrap(onParentKeyUp).should("be.calledOnce");
    });
  });
});
