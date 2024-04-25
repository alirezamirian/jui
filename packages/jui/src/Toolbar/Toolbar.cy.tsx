import React, { useState } from "react";
import { composeStories } from "@storybook/react";
import { IconButton, PlatformIcon, Toolbar } from "@intellij-platform/core";

import * as stories from "./Toolbar.stories";

const {
  Horizontal,
  OverflowFittedInViewport,
  FirstItemDivider,
  LastItemDivider,
  HorizontalOverflow,
  Vertical,
  VerticalOverflow,
  OverflowWrap,
} = composeStories(stories);

describe("Toolbar", () => {
  it("looks good", () => {
    cy.viewport(1280, 800);
    cy.mount(
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1rem",
        }}
      >
        Horizontal:
        <Horizontal />
        Vertical:
        <Vertical />
        HorizontalOverflow:
        <HorizontalOverflow containerWidth={150} />
        VerticalOverflow:
        <VerticalOverflow containerHeight={150} />
        FirstItemDivider:
        <FirstItemDivider /> {/* hides the first item if it's a divider*/}
        LastItemDivider:
        <LastItemDivider /> {/* hides the last item if it's a divider*/}
        OverflowWrap:
        <OverflowWrap />
        <OverflowWrap orientation="horizontal" />
      </div>
    );
    matchImageSnapshot("Toolbar-looks-good");
  });

  it("keeps overflowed buttons accessible", () => {
    cy.mount(<HorizontalOverflow />);
    // 8 toolbar buttons plus one for showing overflow popup
    cy.findAllByRole("button").should("have.length", 9);
  });

  it("shows hidden children in an overflow menu, when orientation is vertical", () => {
    cy.mount(
      <VerticalOverflow
        containerHeight={
          /* to make the first overflowed element be a separator, which should be hidden */
          180
        }
      />
    );
    checkOverflowPopupIsHidden();
    cy.findByRole("toolbar").realHover({ position: "bottom" });
    checkOverflowPopupIsVisible();
    matchImageSnapshot("Toolbar-vertical-overflow");
    cy.get("body").realMouseMove(200, 200, { scrollBehavior: false });
    checkOverflowPopupIsHidden();
  });

  it("shows hidden children in an overflow menu, when orientation is horizontal", () => {
    cy.mount(<HorizontalOverflow containerWidth={100} />);
    checkOverflowPopupIsHidden();
    cy.findByRole("toolbar").realHover({ position: "right" });
    checkOverflowPopupIsVisible();
    matchImageSnapshot("Toolbar-horizontal-overflow");
    cy.get("body").realMouseMove(200, 200, { scrollBehavior: false });
    checkOverflowPopupIsHidden();
  });

  it("fits the overflow popup within the viewport", () => {
    cy.mount(<OverflowFittedInViewport containerWidth={100} />);
    cy.findByRole("toolbar").realHover({ position: "right" });
    matchImageSnapshot("Toolbar-horizontal-overflow-fitted-into-viewport");
  });

  it("can still handle the overflow in very small widths", () => {
    cy.mount(<HorizontalOverflow containerWidth={20} />);
    // all buttons should be hidden
    cy.findAllByRole("button").filter(":visible").should("have.length", 1);

    // .realHover() is flaky in this case.
    // It seems it can double trigger an event that opens the toolbar, resulting
    //  in too many buttons being rendered. Not sure if it's actually revealing some issue in the component or not.
    cy.findByRole("toolbar").realMouseMove(1, 1, { position: "center" });
    // and it should work
    cy.findAllByRole("button")
      .should("be.visible")
      .and(
        "have.length",
        9 /* 8 buttons in the overflow popup + overflow button in the toolbar*/
      );
  });

  it("opens the overflow popup even when half-overflowed hidden elements are hovered", () => {
    cy.mount(<VerticalOverflow containerHeight={150} />);
    // wait for the overflow handling to settle
    cy.findAllByRole("button").filter(":visible").should("have.length", 4);

    // Moving mouse to the area above the overflow arrow button, and on the half-overflowed hidden last button
    cy.findByRole("button", { name: "Delete" }).realMouseMove(0, 6, {
      position: "bottom",
      scrollBehavior: false,
    });
    checkOverflowPopupIsVisible();

    // moving up to visible buttons should close the overflow
    cy.findByRole("button", { name: "Delete" }).realMouseMove(1, 0, {
      position: "center",
      scrollBehavior: false,
    });
    checkOverflowPopupIsHidden();

    // Moving mouse again to the area above the overflow arrow button, and on the half-overflowed hidden last button
    cy.findByRole("button", { name: "Delete" }).realMouseMove(1, 6, {
      position: "bottom",
      scrollBehavior: false,
    });
    checkOverflowPopupIsVisible();

    // Now moving mouse onto the overflow popup. It should not close the popup.
    Array(20)
      .fill(null)
      .forEach((_, index) => {
        cy.findByRole("button", { name: "Delete" }).realMouseMove(-2, index, {
          position: "bottomRight",
          scrollBehavior: false,
        });
      });
    checkOverflowPopupIsVisible();

    // Moving mouse again to the area above the overflow arrow button, and on the half-overflowed hidden last button
    cy.findByRole("button", { name: "Delete" }).realMouseMove(1, 6, {
      position: "bottom",
      scrollBehavior: false,
    });
    checkOverflowPopupIsVisible();

    // Moving mouse out of the toolbar without moving to the overflow popup first should also close the overflow popup.
    cy.findByRole("button", { name: "Delete" }).realMouseMove(200, 6, {
      position: "bottom",
      scrollBehavior: false,
    });
    checkOverflowPopupIsHidden();
  });

  it("prevents half-overflowed hidden elements from capturing mouse events", () => {
    const onMouseEnter = cy.stub();
    cy.mount(
      <VerticalOverflow containerHeight={85}>
        <IconButton aria-label="Hide">
          <PlatformIcon icon="actions/arrowCollapse" />
        </IconButton>
        <IconButton aria-label="Add">
          <PlatformIcon icon="general/add" />
        </IconButton>
        <span onMouseEnter={onMouseEnter}>
          <IconButton aria-label="Delete">
            <PlatformIcon icon="actions/gc" />
          </IconButton>
        </span>
        <IconButton aria-label="Checkout">
          <PlatformIcon icon="actions/checkOut" />
        </IconButton>
      </VerticalOverflow>
    );

    // wait for the overflow handling to settle
    cy.findAllByRole("button").filter(":visible").should("have.length", 2);

    // Moving mouse to the area above the overflow arrow button, and on the half-overflowed hidden last button
    cy.findByRole("button", { name: "Delete" }).realMouseMove(0, 1, {
      position: "top",
      scrollBehavior: false,
    });

    cy.wrap(onMouseEnter).should("not.be.called");
  });

  it("keeps handling overflow properly when orientation changes", () => {
    const Example = () => {
      const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
        "horizontal"
      );
      const changeOrientation = () =>
        setOrientation((orientation) =>
          orientation === "horizontal" ? "vertical" : "horizontal"
        );
      return (
        <>
          <button onClick={changeOrientation}>Change Orientation</button>
          <div
            style={{ [orientation === "vertical" ? "height" : "width"]: 50 }}
          >
            <Toolbar orientation={orientation}>
              <IconButton aria-label="Hide">
                <PlatformIcon icon="actions/arrowCollapse" />
              </IconButton>
              <IconButton aria-label="Add">
                <PlatformIcon icon="general/add" />
              </IconButton>
              <IconButton aria-label="Checkout">
                <PlatformIcon icon="actions/checkOut" />
              </IconButton>
            </Toolbar>
          </div>
        </>
      );
    };
    cy.mount(<Example />);

    cy.findByRole("toolbar")
      .findByRole("button", { name: "Add" })
      .should("be.hidden");

    cy.findByRole("button", { name: "Change Orientation" }).click();

    cy.findByRole("toolbar")
      .findByRole("button", { name: "Add" })
      .should("be.hidden");
  });
});

function checkOverflowPopupIsVisible(buttonNameToCheckBasedOn = "Expand All") {
  // checking based on button visibility instead of existence, not to mix functionality with accessibility testing
  cy.findAllByRole("button", { name: buttonNameToCheckBasedOn })
    .should("be.visible")
    .and("have.length.above", 0);
}

function checkOverflowPopupIsHidden(buttonNameToCheckBasedOn = "Expand All") {
  // checking based on button visibility instead of existence, not to mix functionality with accessibility testing
  cy.findAllByRole("button", { name: buttonNameToCheckBasedOn }).should(
    "not.be.visible"
  );
}

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
