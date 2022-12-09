import React from "react";
import { mount } from "cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./useShortcut.stories";

const {
  Default,
  MultiKeyStroke,
  SecondKeyStrokePriority,
  ConflictingShortcuts,
} = composeStories(stories);

describe("useShortcuts:keyboard", () => {
  it("works for simple keyboard shortcuts", () => {
    const onAction = cy.stub().as("onAction");
    mount(<Default onAction={onAction} />);
    // hits
    cy.realPress(["Control", "c"]);
    cy.realPress(["Control", "C"]);

    // not hits
    cy.realPress(["c"]);
    cy.realPress(["Control", "d"]);
    cy.realPress(["Control", "Alt", "c"]);
    cy.realPress(["Control", "Shift", "c"]);

    cy.get("@onAction").should("have.been.calledTwice");
    cy.get("@onAction").should("have.been.calledWith", "action1");
  });

  it("triggers the first action if multiple actions have the same shortcut", () => {
    const onAction = cy.stub().as("onAction");
    mount(<ConflictingShortcuts onAction={onAction} />);
    cy.realPress(["d"]);
    // maybe only check if onAction is called once, not assuming about "the first" action being triggered.
    cy.get("@onAction").should("have.been.calledOnceWith", "action1");
  });

  describe("multi-keystroke shortcuts", () => {
    it("works in simple cases", () => {
      const onAction = cy.stub().as("onAction");
      mount(<MultiKeyStroke onAction={onAction} />);

      // FIXME: figure out why clock() doesn't work, and use tick() instead of wait(), for efficiency. Maybe it's a bug
      //  fixed in the latest version.
      // cy.clock();
      // Not a hit if the wait is too long
      cy.realPress(["Control", "c"]);
      cy.wait(2200);
      cy.realPress(["d"]);
      cy.get("@onAction").should("not.have.been.calledOnce");

      // Hit, if the delay is less than 2 seconds
      cy.realPress(["Control", "c"]);
      cy.wait(1800);
      cy.realPress(["d"]);
      // cy.clock().invoke("restore");

      cy.get("@onAction").should("have.been.calledOnce");
      cy.get("@onAction").should("have.been.calledWith", "action1");
    });

    it("cancels shortcut if any other key is pressed after the first stroke", () => {
      const onAction = cy.stub().as("onAction");
      mount(<MultiKeyStroke onAction={onAction} />);
      cy.realPress(["Control", "c"]);
      cy.realPress(["Shift"]);
      cy.realPress(["d"]);
      cy.get("@onAction").should("not.have.been.calledOnce");
    });

    it("prioritizes two-stroke shortcuts over one", () => {
      const onAction = cy.stub().as("onAction");
      mount(<SecondKeyStrokePriority onAction={onAction} />);
      cy.realPress(["Control", "c"]);
      cy.realPress(["d"]);
      cy.get("@onAction").should("have.been.calledOnceWith", "action2");
    });

    it("triggers the shortcut, even if the keys of the first key stroke are still down, when the second keystroke happens", () => {
      const onAction = cy.stub().as("onAction");
      mount(
        <Default
          shortcuts={{
            action1: [
              {
                type: "keyboard",
                // we intentionally don't use modifiers here to distinguish this case, with the next one
                firstKeyStroke: { code: "KeyB" },
                secondKeyStroke: { code: "KeyC" },
              },
            ],
          }}
          onAction={onAction}
        />
      );
      cy.focused().trigger("keydown", { code: "KeyB" });
      cy.realPress(["c"]);
      cy.get("@onAction").should("have.been.calledOnceWith", "action1");
    });

    it("ignores extra modifiers in the second keystroke, if they are coming from the first keystroke", () => {
      const onAction = cy.stub().as("onAction");
      mount(
        <Default
          shortcuts={{
            action1: [
              {
                type: "keyboard",
                firstKeyStroke: { modifiers: ["Control"], code: "KeyC" },
                secondKeyStroke: { code: "KeyD" },
              },
            ],
          }}
          onAction={onAction}
        />
      );
      cy.realPress(["Control", "c"]);
      cy.realPress(["Shift", "d"]);

      cy.get("@onAction").should("have.been.calledOnceWith", "action1");
    });
  });
});
