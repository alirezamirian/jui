import React from "react";
import { composeStories } from "@storybook/react";
import { Button } from "@intellij-platform/core/Button";

import * as stories from "./PopupTrigger.stories";
import { PopupTrigger } from "./PopupTrigger";
import { Popup } from "./Popup";

const { Positioning, Default, MenuContent } = composeStories(stories);

describe("PopupTrigger", () => {
  describe("positioning", () => {
    it("Ensures the popup is positioned within the viewport", () => {
      cy.window().then(({ innerWidth, innerHeight }) => {
        const testInPosition = (
          x: number,
          y: number,
          placement: "top" | "bottom" = "bottom"
        ) => {
          cy.mount(<Positioning placement={placement} />);
          cy.get("body").dblclick(x, y); // moves the trigger to double-click position
          cy.findByRole("button", { expanded: false }).click({
            scrollBehavior: false,
          });
          cy.findByRole("dialog").isWithinViewport();
        };
        testInPosition(innerWidth - 50, innerHeight - 50);
        testInPosition(innerWidth / 2, innerHeight - 50);
        testInPosition(50, innerHeight - 50);
        testInPosition(innerWidth - 50, innerHeight / 2);
        testInPosition(10, 20, "top");
        testInPosition(innerWidth / 2, 20, "top");
        testInPosition(innerWidth - 50, 20, "top");
      });
    });

    it("places the popup below the trigger", () => {
      cy.mount(
        <PopupTrigger popup={<Popup data-testid="popup">content</Popup>} isOpen>
          <div style={{ marginLeft: 100 }}>
            <Button>trigger</Button>
          </div>
        </PopupTrigger>
      );
      cy.findByTestId("popup").then(($popup) => {
        const { left, top } = $popup[0].getBoundingClientRect();
        cy.wrap(left).should("eq", 100);
        cy.wrap(top).should("be.closeTo", 24, 1);
      });
    });

    it("places the popup above the trigger, if placement is 'top'", () => {
      cy.mount(
        <PopupTrigger
          popup={<Popup data-testid="popup">content</Popup>}
          placement="top"
          isOpen
        >
          <div style={{ marginLeft: 100, marginTop: 100 }}>
            <Button>trigger</Button>
          </div>
        </PopupTrigger>
      );
      cy.findByTestId("popup").then(($popup) => {
        const { left, top } = $popup[0].getBoundingClientRect();
        cy.wrap(left).should("eq", 100);
        cy.wrap(top).should("eq", 50);
      });
    });
  });

  describe("focus behavior", () => {
    it("autofocuses the popup container if there is no autofocus element in the content", () => {
      cy.mount(<Default />);
      cy.findByRole("button", { expanded: false }).click();
      cy.findByRole("dialog").should("have.focus");
    });

    it("doesn't change the focus if there is an autofocus element in the content", () => {
      cy.mount(<MenuContent />);
      cy.findByRole("button", { expanded: false }).click();
      cy.findByRole("dialog").should("not.have.focus");
      cy.findByRole("menu").should("have.focus");
    });
  });

  it("toggles the popup open when the trigger is pressed", () => {
    cy.mount(
      <PopupTrigger popup={<Popup data-testid="popup">popup content</Popup>}>
        <div style={{ marginLeft: 100 }}>
          <Button>trigger</Button>
        </div>
      </PopupTrigger>
    );
    cy.findByRole("button", { expanded: false }).click();
    cy.contains("popup content");
    cy.findByRole("button", { expanded: true }).click();
    cy.contains("popup content").should("not.exist");
  });
});
