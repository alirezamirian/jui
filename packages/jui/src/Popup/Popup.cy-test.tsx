import React from "react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./Popup.stories";

const { Default, DefaultPosition, DefaultSize, MenuContent, ListContent } =
  composeStories(stories);

describe("Popup", () => {
  describe("sizing and positioning", () => {
    it("Sets the size based on content, and places the popup centered, if no bounds provided", () => {
      cy.mount(<Default />);
      matchImageSnapshot("Popup-default-bounds--simple");
      cy.mount(<MenuContent />);
      matchImageSnapshot("Popup-default-bounds--menu");
      cy.mount(<ListContent />);
      matchImageSnapshot("Popup-default-bounds--list");

      // Tree uses virtualization, and sizing is flaky at the moment. FIXME
      // cy.mount(<TreeContent />);
      // matchImageSnapshot("Popup-default-bounds--tree");
    });

    it("takes default position into account, while setting size based on content", () => {
      cy.mount(<DefaultPosition />);
      matchImageSnapshot("Popup-default-position");
    });

    it("takes default size into account, while placing the popup centered", () => {
      cy.mount(<DefaultSize />);
      matchImageSnapshot("Popup-default-position");
    });
  });

  describe("interactions", function () {
    it("supports resizing from left", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          defaultBounds={{ height: 150, width: 150, top: 100, left: 100 }}
          onBoundsChange={onBoundsChange}
          interactions="all"
        />
      );
      cy.get("#popup").resize("left", -50).invoke("width").should("eq", 100);
      cy.get("#popup").resize("left", 50).invoke("width").should("eq", 150);
      cy.wrap(onBoundsChange).should("be.calledTwice");
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 100, top: 100, left: 150 },
        "resize"
      );
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 150, top: 100, left: 100 },
        "resize"
      );
    });
    it("supports resizing from right", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          defaultBounds={{ height: 150, width: 150, top: 100, left: 10 }}
          onBoundsChange={onBoundsChange}
          interactions="all"
        />
      );
      cy.get("#popup").resize("right", -50).invoke("width").should("eq", 100);
      cy.get("#popup").resize("right", 50).invoke("width").should("eq", 150);
      cy.wrap(onBoundsChange).should("be.calledTwice");
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 100, top: 100, left: 10 },
        "resize"
      );
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 150, top: 100, left: 10 },
        "resize"
      );
    });
    it("supports resizing from top", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          defaultBounds={{ height: 150, width: 150, top: 100, left: 10 }}
          onBoundsChange={onBoundsChange}
          interactions="all"
        />
      );
      cy.get("#popup").resize("top", -50).invoke("height").should("eq", 100);
      cy.get("#popup").resize("top", 50).invoke("height").should("eq", 150);
      cy.wrap(onBoundsChange).should("be.calledTwice");
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 100, width: 150, top: 150, left: 10 },
        "resize"
      );
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 150, top: 100, left: 10 },
        "resize"
      );
    });
    it("supports resizing from bottom", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          defaultBounds={{ height: 150, width: 150, top: 100, left: 10 }}
          onBoundsChange={onBoundsChange}
          interactions="all"
        />
      );
      cy.get("#popup").resize("bottom", -50).invoke("height").should("eq", 100);
      cy.get("#popup").resize("bottom", 50).invoke("height").should("eq", 150);
      cy.wrap(onBoundsChange).should("be.calledTwice");
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 100, width: 150, top: 100, left: 10 },
        "resize"
      );
      cy.wrap(onBoundsChange).should(
        "be.calledWithMatch",
        { height: 150, width: 150, top: 100, left: 10 },
        "resize"
      );
    });

    it("reduces the size to minWidth when mouse jumps passed that size", () => {
      const onBoundsChanging = cy.stub();
      cy.mount(
        <Default
          minWidth={130}
          defaultBounds={{ left: 50, top: 150, width: 150, height: 100 }}
          onBoundsChanging={onBoundsChanging}
          interactions="all"
        />
      );
      cy.get("#popup").resize("right", -40).invoke("width").should("eq", 130);
      cy.wrap(onBoundsChanging).should(
        "be.calledOnceWith",
        Cypress.sinon.match({ left: 50, top: 150, width: 130, height: 100 }),
        "resize"
      );
    });

    it("supports moving the popup by dragging the header", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          defaultBounds={{ left: 100, top: 100, width: 100, height: 100 }}
          onBoundsChange={onBoundsChange}
        />
      );
      cy.contains("Title").move(-50, 50);
      cy.get("#popup")
        .invoke("offset")
        .should("deep.equal", { left: 50, top: 150 });
      cy.wrap(onBoundsChange).should(
        "be.calledOnceWith",
        Cypress.sinon.match({ left: 50, top: 150, width: 100, height: 100 }),
        "move"
      );
    });

    it("doesn't allow moving or resize, when `interactions` is 'none'", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          interactions="none"
          defaultBounds={{ left: 100, top: 100, width: 100, height: 100 }}
          onBoundsChange={onBoundsChange}
        />
      );
      cy.contains("Title").move(-50, 50);
      cy.get("#popup").resize("bottom", -50);
      cy.get("#popup")
        .invoke("offset")
        .should("deep.equal", { left: 100, top: 100 });
      cy.get("#popup").invoke("height").should("eq", 100);
      cy.wrap(onBoundsChange).should("not.be.called");
    });

    it("allows moving, but doesn't allow resize when `interactions` is 'move'", () => {
      const onBoundsChange = cy.stub();
      cy.mount(
        <Default
          interactions="move"
          defaultBounds={{ left: 100, top: 100, width: 100, height: 100 }}
          onBoundsChange={onBoundsChange}
        />
      );
      cy.contains("Title").move(-50, 50);
      cy.get("#popup").resize("left", 50).move(-50, 50);
      cy.get("#popup")
        .invoke("offset")
        .should("deep.equal", { left: 50, top: 150 });
      cy.wrap(onBoundsChange).should(
        "be.calledOnceWith",
        Cypress.sinon.match({ left: 50, top: 150, width: 100, height: 100 }),
        "move"
      );
    });
  });

  it("calls onClose on outside click, by default", () => {
    const onClose = cy.stub();
    cy.mount(<Default onClose={onClose} />);
    cy.get("body").click("bottomRight");
    cy.wrap(onClose).should("be.calledOnce");
  });

  it("doesn't call onClose on outside click, if nonDismissable is true", () => {
    const onClose = cy.stub();
    cy.mount(<Default onClose={onClose} nonDismissable />);
    cy.get("body").click("bottomRight");
    cy.wrap(onClose).should("not.be.called");
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = cy.stub();
    cy.mount(<Default onClose={onClose} id="popup" />);
    cy.get("#popup").focus();
    cy.realPress("Escape");
    cy.mount(<Default onClose={onClose} id="popup" nonDismissable />);
    cy.get("#popup").focus();
    cy.realPress("Escape");
    // Regardless of nonDismissable, pressing Escape should always close the popup
    cy.wrap(onClose).should("be.calledTwice");
  });

  it("lets focus go to focusable elements outside popup, when they are clicked", () => {
    cy.mount(<Default />);
    cy.get("input").click().should("have.focus");
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
