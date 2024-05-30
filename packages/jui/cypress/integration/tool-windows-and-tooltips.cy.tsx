import React, { useState } from "react";
import {
  ActionTooltip,
  PlatformIcon,
  Theme,
  ThemeProvider,
  TooltipTrigger,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
} from "@intellij-platform/core";
import darculaThemeJson from "../../themes/darcula.theme.json";

const window = (id: string) => ({
  id,
  toolbarButton: (
    <TooltipTrigger tooltip={<ActionTooltip actionName={id} />}>
      <span>
        <PlatformIcon icon="toolwindows/toolWindowProject" />
        &nbsp;
        {id}
      </span>
    </TooltipTrigger>
  ),
  content: null,
});

const SimpleToolWindows = () => {
  const [state, setState] = useState(
    () =>
      new ToolWindowsState({
        "First window": toolWindowState({ isVisible: true }),
        "Second window": toolWindowState(),
      })
  );
  return (
    <ToolWindows
      height={"100vh"}
      toolWindowsState={state}
      windows={[window("First window"), window("Second window")]}
      onToolWindowStateChange={setState}
    >
      <div style={{ padding: 8 }}>
        <textarea />
      </div>
    </ToolWindows>
  );
};

describe("integration of tool window with tooltip", () => {
  it("supports tooltip on stipe buttons", () => {
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <SimpleToolWindows />
      </ThemeProvider>
    );

    cy.contains("First window")
      .realMouseDown({ position: "topLeft" })
      .realMouseMove(0, 150)
      .realMouseUp();

    // Check if the first tool window is moved after the second. image snapshot testing would also be an easy way to
    // assert the expected result, but not used just to save the quota :D
    cy.get("[data-key]:contains('First window')")
      .invoke("index")
      .should("equal", 1);
  });
});
