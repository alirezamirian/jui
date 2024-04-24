import React from "react";
import {
  AlertDialog,
  Button,
  Checkbox,
  PlatformIcon,
} from "@intellij-platform/core";

const example = (
  <AlertDialog
    id="alert"
    type="warning"
    heading="Process 'storybook:start' Is Running"
    body="Do you want to terminate the process 'storybook:start'?"
    checkbox={<Checkbox>Don't ask again</Checkbox>}
    buttons={
      <>
        <Button>Cancel</Button>
        <Button autoFocus>Disconnect</Button>
        <Button variant="default">Terminate</Button>
      </>
    }
    helpButton={
      <Button variant="icon">
        <PlatformIcon icon="actions/help"></PlatformIcon>
      </Button>
    }
  />
);
describe("AlertDialog", () => {
  it("looks good", () => {
    cy.mount(example);
    matchImageSnapshot("AlertDialog-warning");
  });
  it("is accessible as alertdialog", () => {
    cy.mount(example);
    cy.findByRole("alertdialog");
  });

  it("allows moving by dragging the whitespaces", () => {
    cy.mount(example);
    cy.get("#alert").then((dialog) => {
      const { x, y } = dialog[0].getBoundingClientRect();
      cy.wrap(dialog)
        .realMouseDown({ position: { x: 100, y: 72 } })
        .realMouseMove(20, 50, { position: { x: 100, y: 72 } })
        .realMouseUp()
        .invoke("0.getBoundingClientRect")
        .then((bounds) => {
          expect(bounds.x).to.be.approximately(x + 20, 5);
          expect(bounds.y).to.be.approximately(y + 50, 5);
        });
    });
  });

  it("allows for selecting text, and doesn't move the dialog when texts are being selected", () => {
    cy.mount(example);
    cy.get("#alert").then((dialog) => {
      const { x, y } = dialog[0].getBoundingClientRect();
      cy.contains("Process 'storybook:start' Is Running").move(50, 20);
      cy.wrap(dialog)
        .invoke("0.getBoundingClientRect")
        .then((bounds) => {
          expect(bounds.x).to.equal(x);
          expect(bounds.y).to.equal(y);
        });
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
