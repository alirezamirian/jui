import React from "react";
import { ButtonGroup } from "@intellij-platform/core/ButtonGroup/ButtonGroup";
import { Button } from "@intellij-platform/core/Button";
import { IconButton, PlatformIcon } from "@intellij-platform/core";

describe("ButtonGroup", () => {
  it("applies the right spacing between the buttons", () => {
    cy.mount(
      <ButtonGroup>
        <button>Cancel</button>
        <button>Ok</button>
      </ButtonGroup>
    );
    matchImageSnapshot("ButtonGroup-gap");
  });

  it("moves focus between the buttons by right/left arrow keys", () => {
    cy.mount(
      <ButtonGroup>
        <Button>Button</Button>
        <button>button</button>
        <IconButton aria-label="Search">
          <PlatformIcon icon="actions/search" />
        </IconButton>
      </ButtonGroup>
    );
    cy.findByRole("button", { name: "button" }).focus().realPress("ArrowLeft");
    cy.findByRole("button", { name: "Button" })
      .should("be.focused")
      .realPress("ArrowLeft"); // should wrap
    cy.findByRole("button", { name: "Search" }).should("be.focused");
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
