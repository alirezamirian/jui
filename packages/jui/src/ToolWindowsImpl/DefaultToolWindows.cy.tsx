import React, { useState } from "react";
import {
  DefaultToolWindow,
  DefaultToolWindows,
  Theme,
  ThemeProvider,
  ToolWindowRefValue,
  ToolWindowsState,
  toolWindowState,
  ToolWindowState,
} from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";
import { KeymapProvider } from "@intellij-platform/core/ActionSystem";

const window = (id: string) => ({
  id,
  title: id,
  icon: null,
  content: (
    <DefaultToolWindow
      data-testid={`${id}`}
      headerContent={<span style={{ whiteSpace: "nowrap" }}>{id}</span>}
    >
      <input />
      <input />
    </DefaultToolWindow>
  ),
});

const SimpleToolWindows = React.forwardRef(
  (
    {
      initialState = {
        "First window": toolWindowState({ isVisible: true }),
        "Second window": toolWindowState({ anchor: "bottom", isVisible: true }),
      },
    }: {
      initialState?: { [key: string]: ToolWindowState };
    },
    ref: React.ForwardedRef<ToolWindowRefValue>
  ) => {
    const [state, setState] = useState(
      () => new ToolWindowsState(initialState)
    );

    return (
      <DefaultToolWindows
        ref={ref}
        height={"100vh"}
        toolWindowsState={state}
        onToolWindowStateChange={setState}
        windows={[window("First window"), window("Second window")]}
      >
        <div style={{ padding: 8 }}>
          <textarea data-testid="main content focusable" />
        </div>
      </DefaultToolWindows>
    );
  }
);

describe("DefaultToolWindowHeader", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });
  it("overflows the header title out, in small sizes, without pushing the content", () => {
    cy.mount(<SimpleToolWindows />);
    cy.findByTestId("First window").resizeFromSide("right", -150);
    cy.percySnapshot("DefaultToolWindowHeader--overflow", {
      scope: '[data-testid="First window"]',
    });
  });
});

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

    it("opens the last activated tool window, if closed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window").click(); // Activate the first tool window
      cy.contains("First window").click(); // Close the first tool window
      cy.realPress(["F12"]);
      cy.findByTestId("First window").should("exist");
    });

    it("adds removed from sidebar tool window back", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <SimpleToolWindows />
        </ThemeProvider>
      );
      cy.findByTestId("First window").click(); // Activate the first tool window
      cy.contains("First window").click(); // Close the first tool window
      cy.realPress(["F12"]);
      cy.findByTestId("First window").should("exist");
    });
  });
  describe("ActivateToolWindow", () => {
    it("opens and focuses tool window if currently closed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <WithActivateToolWindowKeymap />
        </ThemeProvider>
      );
      cy.contains("Second window").click(); // closing second tool window
      cy.realPress(["Meta", "2"]);
      cy.findByTestId("Second window").should("exist");
      cy.findByTestId("Second window").find("input").eq(0).should("have.focus");
    });

    it("opens and focuses tool window (in the same anchor) if currently closed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <WithActivateToolWindowKeymap
            initialState={{
              "First window": toolWindowState({ anchor: "left" }),
              "Second window": toolWindowState({
                anchor: "left",
                isSplit: true,
                isVisible: true,
              }),
            }}
          />
        </ThemeProvider>
      );
      cy.realPress(["Meta", "1"]);
      cy.findByTestId("First window").should("exist");
      /**
       * Known issue: https://github.com/alirezamirian/jui/issues/42
       * Inverted assertion, in the absence of it.fail(). Just to make sure it will not be overlooked when the issue
       * is resolved. The assertion should be `.should("have.focus")`.
       */
      cy.findByTestId("First window")
        .find("input")
        .eq(0)
        .should("not.have.focus");
    });

    it("closes tool window if currently focused", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <WithActivateToolWindowKeymap />
        </ThemeProvider>
      );
      cy.findByTestId("Second window").should("exist");
      cy.realPress(["Meta", "2"]);
      cy.findByTestId("Second window").should("not.exist");
    });

    it("focuses tool window if open but not focused", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <WithActivateToolWindowKeymap />
        </ThemeProvider>
      );
      cy.findByTestId("Second window").should("exist");
      cy.realPress(["Meta", "1"]);
      cy.findByTestId("First window").find("input").eq(0).should("have.focus");
    });

    it("moves focus to the main window when window is toggled closed", () => {
      cy.mount(
        <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
          <WithActivateToolWindowKeymap />
        </ThemeProvider>
      );
      cy.realPress(["Meta", "2"]);
      cy.findByTestId("main content focusable").should("have.focus");
    });
  });
});

function WithActivateToolWindowKeymap({
  initialState,
}: {
  initialState?: { [id: string]: ToolWindowState };
}) {
  return (
    <KeymapProvider
      keymap={{
        ActivateFirstwindowWindow: [
          {
            type: "keyboard",
            firstKeyStroke: {
              modifiers: ["Meta"],
              code: "Digit1",
            },
          },
        ],
        ActivateSecondwindowWindow: [
          {
            type: "keyboard",
            firstKeyStroke: {
              modifiers: ["Meta"],
              code: "Digit2",
            },
          },
        ],
      }}
    >
      <SimpleToolWindows initialState={initialState} />
    </KeymapProvider>
  );
}
