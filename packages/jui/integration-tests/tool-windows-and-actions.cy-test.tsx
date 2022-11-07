import React, { useState } from "react";
import {
  ActionTooltip,
  DefaultToolWindow,
  PlatformIcon,
  Theme,
  ThemeProvider,
  TooltipTrigger,
  ToolWindowsState,
  toolWindowState,
  ToolWindowsWithActions,
} from "@intellij-platform/core";
import darculaThemeJson from "../themes/darcula.theme.json";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";

const SimpleToolWindows = ({
  selectedToolWindow = "First window",
}: {
  selectedToolWindow?: string;
}) => {
  const [state, setState] = useState(
    () =>
      new ToolWindowsState({
        "First window": toolWindowState({
          isVisible: selectedToolWindow === "First window",
        }),
        "Second window": toolWindowState({
          isVisible: selectedToolWindow === "Second window",
        }),
      })
  );
  return (
    <ToolWindowsWithActions
      height={"100vh"}
      toolWindowsState={state}
      onToolWindowStateChange={setState}
      renderToolbarButton={(id) => (
        <TooltipTrigger tooltip={<ActionTooltip actionName={id} />}>
          <span>
            <PlatformIcon icon="toolwindows/toolWindowProject" />
            &nbsp;
            {id}
          </span>
        </TooltipTrigger>
      )}
      renderWindow={(id) => {
        return (
          <DefaultToolWindow headerContent={id} id="tool-window">
            {id === "First window" ? <SpeedSearchTreeSample /> : <input />}
          </DefaultToolWindow>
        );
      }}
    >
      <div style={{ padding: 8 }}>
        <textarea />
      </div>
    </ToolWindowsWithActions>
  );
};

describe("integration of Tool Windows and Action System", () => {
  beforeEach(() => {
    cy.viewport("macbook-11");
  });
  it("supports tool window actions when a SpeedSearchTree is focused in the tool window", () => {
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <SimpleToolWindows />
      </ThemeProvider>
    );
    cy.contains("List").click();
    cy.realType("The");
    testResizeActions();

    cy.realPress(["Escape"]); // Clear speed search
    // SpeedSearch should be cleared, but 'FocusEditor" action should not be triggered
    cy.get("textarea").should("not.have.focus");
    cy.realPress(["Escape"]); // With a clear search state, 'FocusEditor" action should trigger now
    cy.get("textarea").should("have.focus");

    cy.contains("List").click(); // Move focus back to the SpeedSearchTree
    cy.realType("The"); // Search for something

    cy.get("#tool-window").should("exist");
    cy.realPress(["Shift", "Escape"]); // "HideActiveWindow" should trigger, since SpeedSearch doesn't handle key strokes with modifiers
    cy.get("#tool-window").should("not.exist"); // Verify tool window is closed
  });

  it.skip("doesn't change the focus when JumpToLastWindow action triggers while the first focusable element is already focused", () => {
    // There is a minor issue now in SpeedSearchTree: when the tree is focused manually, speed search is cleared.
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <SimpleToolWindows />
      </ThemeProvider>
    );
    cy.contains("List").click();
    cy.realType("The");
    // Trigger JumpToLastWindow. The first focusable element of the tool window is already focused. Nothing should happen.
    cy.realPress(["F12"]);
    cy.findAllByText("The").should("have.length", 3); // Speed search state should not change.
  });

  it("supports tool window actions when a native input is focused in the tool window", () => {
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <SimpleToolWindows selectedToolWindow="Second window" />
      </ThemeProvider>
    );
    cy.get("input").click();
    testResizeActions();

    cy.realPress(["Escape"]);
    cy.get("textarea").should("have.focus");

    cy.get("input").click(); // Move focus back to the tool window

    cy.get("#tool-window").should("exist");
    cy.realPress(["Shift", "Escape"]); // "HideActiveWindow" should trigger, since SpeedSearch doesn't handle key strokes with modifiers
    cy.get("#tool-window").should("not.exist"); // Verify tool window is closed
  });
});

function testResizeActions() {
  cy.get("#tool-window").invoke("width").should("be.closeTo", 273, 5);
  cy.realPress(["Alt", "Control", "ArrowRight"]);
  cy.get("#tool-window").invoke("width").should("be.closeTo", 338, 5);
  cy.realPress(["Alt", "Control", "ArrowLeft"]);
  cy.get("#tool-window").invoke("width").should("be.closeTo", 273, 5);
}
