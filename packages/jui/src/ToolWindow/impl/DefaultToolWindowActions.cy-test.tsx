import React, { useState } from "react";
import {
  ActionTooltip,
  DefaultToolWindow,
  PlatformIcon,
  Theme,
  ThemeProvider,
  TooltipTrigger,
  ToolWindowsState,
  ToolWindowState,
  toolWindowState,
  ToolWindowsWithActions,
} from "@intellij-platform/core";
import darculaThemeJson from "../../../themes/darcula.theme.json";
import { DefaultToolWindowActions } from "@intellij-platform/core/ToolWindow/impl/DefaultToolWindowActions";

const SimpleToolWindows = ({
  initialState = {
    "First window": toolWindowState({ isVisible: true }),
    "Second window": toolWindowState({ anchor: "bottom", isVisible: true }),
  },
}: {
  initialState?: { [key: string]: ToolWindowState };
}) => {
  const [state, setState] = useState(() => new ToolWindowsState(initialState));
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
          <DefaultToolWindow headerContent={id} data-testid={`${id}`}>
            <input />
            <input />
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

describe("DefaultToolWindowActions", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  describe("HideToolWindow", () => {
    it("hides all tool windows, when there is at least one open window", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window").get("input").first().focus();

      cy.findByTestId("First window").should("exist");
      cy.findByTestId("Second window").should("exist");
      cy.realPress(["Shift", "Meta", "F12"]);
      cy.findByTestId("First window").should("not.exist");
      cy.findByTestId("Second window").should("not.exist");

      // when all windows are hidden, it should restore last opened windows
      cy.realPress(["Shift", "Meta", "F12"]);
      cy.findByTestId("First window").should("exist");
      cy.findByTestId("Second window").should("exist");
    });

    it("restore previously opened windows, even when moved to another anchor", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window").get("input").first().focus();
      cy.realPress(["Shift", "Meta", "F12"]);
      // move the second window to left-bottom anchor
      cy.contains("Second window").realMouseDown();
      cy.contains("Second window").realMouseMove(-10, -300);
      cy.contains("Second window").realMouseUp({ position: { x: 10, y: 200 } });
      cy.get("textarea").first().focus();
      cy.realPress(["Shift", "Meta", "F12"]);
      cy.findByTestId("First window").should("exist"); // in left-top anchor
      cy.findByTestId("Second window").should("exist"); //// in left-bottom anchor
    });
  });

  describe("JumpToLastWindow", () => {
    it("works", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("Second window").find("input").eq(0).click();
      cy.findByTestId("First window").find("input").eq(0).click();
      cy.get("textarea").first().click();

      cy.realPress(["F12"]);
      // focus should be moved to the first focusable element.
      cy.findByTestId("First window").find("input").eq(0).should("have.focus");

      // Triggering the action while a tool window is already focus, moves focus to the first focusable element.
      // It would make sense to not change the focus, but the reference impl, focus is moved to the first focusable elem.
      cy.findByTestId("Second window").find("input").eq(1).click();
      cy.realPress(["F12"]);
      cy.findByTestId("Second window").find("input").eq(0).should("have.focus");
    });
  });
});
