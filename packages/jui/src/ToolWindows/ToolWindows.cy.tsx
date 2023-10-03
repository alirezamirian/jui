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

const window = (id: string) => ({
  id,
  toolbarButton: <span data-testid={`${id} stripe button`}>{id}</span>,
  content: (
    <DefaultToolWindow
      headerContent={<span data-testid={`${id} header`}>{id}</span>}
      data-testid={`${id}`}
    >
      <input data-testid={`${id} focusable 1`} />
      <input data-testid={`${id} focusable 2`} />
    </DefaultToolWindow>
  ),
});

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
      windows={[window("First window"), window("Second window")]}
    >
      <div style={{ padding: 8 }}>
        <textarea data-testid="main content focusable" />
        <div data-testid="main content non-focusable">main content</div>
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

    it("focuses the first focusable element, when a non-focusable area within the tool window is clicked", () => {
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

    it("moves focus to the main area, when a non-focusable area within in the main area is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.contains("First window").realClick();
      cy.findByTestId("First window focusable 2")
        .realClick()
        .should("be.focused");
      cy.findByTestId("main content non-focusable").realClick();
      cy.findByTestId("main content focusable").should("have.focus");
    });

    it("keeps main content focused, when a non-focusable element inside is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <div>outside area</div>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("main content focusable").focus().should("have.focus");
      cy.findByTestId("main content non-focusable").realClick(); // clicking non-focusable element inside tool window
      cy.findByTestId("main content focusable").should("have.focus");
    });

    it("looses focus when a non-focusable element outside is clicked", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <div>outside area</div>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("main content focusable").focus().should("have.focus");
      cy.contains("outside area").realClick(); // clicking non-focusable element outside tool window
      cy.findByTestId("main content focusable").should("not.have.focus");
    });

    it("allows focusable element outside the ToolWindows get focused.", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <div>
            outside area <input data-testid="outside-input" />
          </div>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("main content focusable").focus().should("have.focus");
      cy.findByTestId("outside-input").realClick().should("have.focus");
    });

    // NOTE: even when focus is within the tool window, focusing the tool window container (by pressing header,
    // or any other means), will move focus to the first focusable element, in the reference implementation.
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

    it("moves focus to the main content when a window is toggled closed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window stripe button").click();
      cy.findByTestId("Second window stripe button").click();
      cy.findByTestId("Second window stripe button").click();

      cy.findByTestId("main content focusable").should("have.focus");
    });

    it("keeps focus where it is, when stripe buttons are being pressed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window stripe button").click();
      cy.findByTestId("First window focusable 1").should("be.focused");
      cy.findByTestId("First window stripe button").realMouseDown();
      cy.findByTestId("First window focusable 1").should("be.focused");
      cy.findByTestId("First window stripe button").realMouseMove(10, 50);
      cy.findByTestId("First window focusable 1").should("be.focused");
      cy.get("body").realMouseUp();
      cy.findByTestId("First window focusable 1").should("be.focused");
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
