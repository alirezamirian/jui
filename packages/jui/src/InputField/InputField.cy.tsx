import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./InputField.stories";
import { InputField } from "@intellij-platform/core";

const {
  Default,
  Invalid,
  Disabled,
  LabelAbove,
  WithPlaceholder,
  WithContextHelp,
} = composeStories(stories);

describe("InputField", () => {
  it("looks good", () => {
    cy.mount(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Default />
        <LabelAbove />
        <WithPlaceholder />
        <Disabled />
        <WithContextHelp />
        <Invalid />
        <Invalid /> {/* Focused */}
      </div>
    );
    cy.findAllByRole("textbox").last().focus();
    matchImageSnapshot("InputField-looks-good");
  });

  it("doesn't allow interactions when disabled", () => {
    cy.mount(<InputField isDisabled />);
    cy.findByRole("textbox").realClick().should("not.have.focus");
  });

  it("is labels input element by the label", () => {
    cy.mount(<InputField label="The label" />);
    cy.findByRole("textbox", { name: "The label" });
  });

  it("describes the input element by the context help", () => {
    cy.mount(<InputField contextHelp="The description" />);
    cy.findByRole("textbox", { description: "The description" });
  });

  it("focuses the input element when label is clicked", () => {
    cy.mount(<InputField label="The label" />);
    cy.contains("The label").click();
    cy.findByRole("textbox").should("have.focus");
  });

  it("supports autofocusing", () => {
    cy.mount(<InputField autoFocus />);
    cy.findByRole("textbox").should("have.focus");
  });

  describe("react API", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      cy.mount(<InputField ref={ref} />);
      cy.wrap(ref).its("current").should("be.instanceOf", HTMLInputElement);
    });
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
