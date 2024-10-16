import React from "react";
import {
  ComboBox,
  Dropdown,
  InputField,
  Item,
  LabeledControlsAlignmentProvider,
} from "@intellij-platform/core";

describe("labeled control alignment", () => {
  it("aligns input boxes (https://jetbrains.github.io/ui/principles/layout/#05)", () => {
    cy.mount(
      <LabeledControlsAlignmentProvider>
        <div
          style={{
            display: "flex",
            padding: "1rem",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: 400,
          }}
        >
          <InputField label="InputField:" />
          <InputField label="Second InputField:" />
          <Dropdown label="Dropdown:">
            <Item key="80">80</Item>
          </Dropdown>
          <ComboBox label="ComboBox:">
            <Item key="80">80</Item>
          </ComboBox>
        </div>
      </LabeledControlsAlignmentProvider>
    );
    matchImageSnapshot("labeled-control-alignment");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
