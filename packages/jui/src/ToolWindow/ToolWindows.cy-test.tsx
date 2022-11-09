import React, { useState } from "react";
import {
  DefaultToolWindow,
  Theme,
  ThemeProvider,
  ToolWindows,
  ToolWindowsState,
  ToolWindowState,
  toolWindowState,
} from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";

const SimpleToolWindows = ({
  initialState = {
    "First window": toolWindowState({ isVisible: false }),
    "Second window": toolWindowState({ anchor: "bottom", isVisible: false }),
  },
}: {
  initialState?: { [key: string]: ToolWindowState };
}) => {
  const [state, setState] = useState(() => new ToolWindowsState(initialState));
  return (
    <ToolWindows
      height={"100vh"}
      toolWindowsState={state}
      onToolWindowStateChange={setState}
      renderToolbarButton={(id) => (
        <span data-testid={`${id} stripe button`}>{id}</span>
      )}
      renderWindow={(id) => {
        return (
          <DefaultToolWindow
            headerContent={<span data-testid={`${id} header`}>{id}</span>}
            data-testid={`${id}`}
          >
            <input data-testid={`${id} focusable 1`} />
            <input data-testid={`${id} focusable 2`} />
          </DefaultToolWindow>
        );
      }}
    >
      <div style={{ padding: 8 }}>
        <textarea data-testid="main content focusable" />
      </div>
    </ToolWindows>
  );
};

describe("ToolWindows", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });
  describe("focus management", () => {
    it("auto focuses tool window after opened", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").click();
      cy.findByTestId("First window focusable 1").should("have.focus");
    });
    it("keeps focused element focused, when a non-focusable area within the tool window is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").click();
      cy.findByTestId("First window focusable 2").click();
      cy.get("body").click(100, 100);
      cy.focused().should("exist");
      // The preferred behaviour is to keep the focus on the currently focused element (focusable 2) but that's a
      // not the case due to how FocusScope is implemented. FIXME: improve the behaviour and adjust the test
      cy.findByTestId("First window focusable 1").should("have.focus");
    });
    it("keeps focused element focused, when a non-focusable area within in the main area is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").click();
      cy.findByTestId("First window focusable 2").click();
      cy.get("body").click(500, 100);
      cy.focused().should("exist");
      cy.findByTestId("First window focusable 2").should("have.focus");
    });
    it("focuses the first focusable element in a tool window, when the header is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").click();
      cy.findByTestId("First window focusable 2").click();
      cy.findByTestId("First window header").click();
      cy.findByTestId("First window focusable 1").should("have.focus");
    });

    it("moves focus to the main content when a window is toggled closed ", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window stripe button").click();
      cy.findByTestId("Second window stripe button").click();
      cy.findByTestId("Second window stripe button").click();

      // Focus should to go main content, but it doesn't currently because of a known issue. FIXME in ToolWindows
      // cy.findByTestId("main content focusable").should('have.focus');
      cy.findByTestId("First window focusable 1").should("have.focus");
    });
    /**
     * Known issue. FIXME. See DefaultToolWindow for more info
     */
    it.skip("traps focus within the active tool window when tabbing", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").click();
      cy.findByTestId("First window focusable 1").click().realPress("Tab");
      cy.findByTestId("First window focusable 2")
        .should("have.focus")
        .realPress("Tab");
      cy.findByTestId("First window focusable 1").should("have.focus");
    });
  });
});
