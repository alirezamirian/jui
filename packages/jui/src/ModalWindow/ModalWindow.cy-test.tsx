/// <reference types="cypress-real-events" /> just for editor. because Webstorm doesn't use the right tsconfig for this file
import { mount } from "cypress/react";
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./ModalWindow.stories";

const { Default } = composeStories(stories);

describe("ModalWindow", () => {
  it("works!", () => {
    mount(<Default>Content</Default>);
    matchImageSnapshot("ModalWindow-default");
  });
  it("supports resize", () => {
    const onBoundsChange = cy.stub().as("onBoundsChange");
    mount(
      <Default
        defaultBounds={{ left: 100, top: 100, width: 200, height: 150 }}
        onBoundsChange={onBoundsChange}
      >
        {""}
      </Default>
    );
    // Resize from left to 50px more width
    drag({ x: 100, y: 150 }, { x: 50, y: 100 });
    cy.get("@onBoundsChange")
      .should("have.been.calledOnce")
      .should("have.been.calledWith", {
        left: 50,
        top: 100,
        width: 250,
        height: 150,
      });

    // Resize from top to 50px less height
    drag({ x: 100, y: 100 }, { x: 100, y: 150 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 250,
      height: 100,
    });

    // Resize from right to 50px less width
    drag({ x: 300, y: 200 }, { x: 250, y: 210 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 200,
      height: 100,
    });

    // Resize from bottom to 50px more height
    drag({ x: 200, y: 250 }, { x: 210, y: 300 });
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 50,
      top: 150,
      width: 200,
      height: 150,
    });
  });
  it("supports drag header to move", () => {
    const onBoundsChange = cy.stub().as("onBoundsChange");
    mount(
      <Default
        defaultBounds={{ left: 100, top: 100, width: 200, height: 150 }}
        title="title"
        onBoundsChange={onBoundsChange}
      >
        {" "}
      </Default>
    );
    cy.contains("title").realMouseDown({ position: { x: 10, y: 10 } });
    cy.get("body").realMouseMove(50, 50).realMouseUp();
    cy.get("@onBoundsChange").should("have.been.calledOnce");
    cy.get("@onBoundsChange").should("have.been.calledWith", {
      left: 40,
      top: 40,
      width: 200,
      height: 150,
    });
  });

  it("supports intercepting in-interaction bound changes", () => {
    // TODO
  });
});

function drag(from: { x: number; y: number }, to: { x: number; y: number }) {
  cy.get("body")
    .realMouseDown({ position: from })
    .realMouseMove(to.x, to.y)
    .realMouseUp({ position: to });
}

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);
}
