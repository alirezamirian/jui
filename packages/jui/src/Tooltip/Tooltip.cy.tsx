import React, { useState } from "react";
import { composeStories } from "@storybook/react";
import * as tooltipTriggerStories from "./TooltipTrigger.stories";
import * as helpTooltipStories from "./HelpTooltip.stories";
import * as actionHelpTooltipStories from "./ActionHelpTooltip.stories";
import * as actionTooltipStories from "./ActionTooltip.stories";
import {
  PositionedTooltipTrigger,
  ValidationTooltip,
} from "@intellij-platform/core";

const { Default, OnInput, All, Interactive, Disabled, WithPointer } =
  composeStories(tooltipTriggerStories);
const HelpTooltipStories = composeStories(helpTooltipStories);
const ActionHelpTooltipStories = composeStories(actionHelpTooltipStories);
const ActionTooltipStories = composeStories(actionTooltipStories);

describe("TooltipTrigger", () => {
  it("opens the tooltip on hover, and closes it when trigger area is left", () => {
    // https://jetbrains.github.io/ui/controls/tooltip/#17
    // https://jetbrains.github.io/ui/controls/tooltip/#18
    cy.mount(<All />);
    workaroundHoverIssue();
    cy.get("button").first().realHover();

    cy.findByRole("tooltip") // waiting for tooltip to appear
      .realMouseMove(10, 10); // moving mouse out of the trigger and onto the tooltip.
    cy.findByRole("tooltip").should("not.exist"); //tooltip should be closed
  });

  it("allows user to click links in a tooltip, if any", () => {
    // https://jetbrains.github.io/ui/controls/tooltip/#20
    cy.mount(<Interactive />);
    workaroundHoverIssue();
    cy.get("button").realHover();

    cy.findByRole("tooltip") // waiting for tooltip to appear
      .realMouseMove(10, 10); // moving mouse out of the trigger and onto the tooltip.
    cy.findByRole("tooltip"); //tooltip should not be closed
  });

  it("doesn't show the tooltip if tooltip is disabled", () => {
    cy.mount(<Disabled delay={0} />);
    workaroundHoverIssue();
    cy.get("button").first().realHover();

    cy.wait(100).findByRole("tooltip").should("not.exist");
  });

  it("closes the tooltip when trigger is clicked", () => {
    cy.mount(<Default />);
    workaroundHoverIssue();
    cy.get("button").first().realHover();
    cy.findByRole("tooltip"); // waiting for tooltip to appear
    cy.get("button").click();
    cy.findByRole("tooltip").should("not.exist"); // tooltip should not be closed
  });

  it("doesn't close the tooltip on click, if the trigger is an input", () => {
    cy.mount(<OnInput />);
    workaroundHoverIssue();
    cy.get("input").first().realHover();
    cy.findByRole("tooltip"); // waiting for tooltip to appear
    cy.get("input").click();
    cy.findByRole("tooltip"); // tooltip should not be closed
  });

  it("renders the arrow in the right position", () => {
    cy.mount(
      <div style={{ padding: 40 }}>
        <WithPointer />
      </div>
    );
    workaroundHoverIssue();
    cy.get("button").first().realHover({ position: "bottom" });
    cy.findByRole("tooltip");
    matchImageSnapshot("TooltipTrigger-WithPointer"); // the percy snapshot is not accurate :/
  });
});

describe("PositionedTooltipTrigger", () => {
  it("shows/hides the tooltip on focus/blur if showOnFocus is true", () => {
    cy.mount(
      <>
        <button>button</button>
        <PositionedTooltipTrigger
          tooltip={<ValidationTooltip>tooltip</ValidationTooltip>}
          showOnFocus
          delay={0}
        >
          <input />
        </PositionedTooltipTrigger>
      </>
    );
    // Note: just focusing the input via .focus() didn't consistently work for some reason.
    cy.get("button").focus().realPress("Tab");
    cy.findByRole("tooltip").should("exist");
    cy.get("input").first().blur();
    cy.findByRole("tooltip").should("not.exist");
  });

  it(
    "closes the tooltip when the tooltip is disabled while being open",
    { retries: { runMode: 3, openMode: 0 } },
    () => {
      const Example = () => {
        const [isDisabled, setIsDisabled] = useState(false);
        return (
          <>
            <button>button</button>
            <PositionedTooltipTrigger
              tooltip={<ValidationTooltip>Error message</ValidationTooltip>}
              showOnFocus
              isDisabled={isDisabled}
            >
              <input
                onChange={() => {
                  setIsDisabled(true);
                }}
              />
            </PositionedTooltipTrigger>
          </>
        );
      };
      cy.mount(<Example />);
      cy.get("button").focus().realPress("Tab");
      cy.findByRole("tooltip").should("exist");
      cy.realType("a");
      cy.findByRole("tooltip").should("not.exist");
    }
  );
});

/**
 * Workaround for @react-aria/interaction issues with `realHover`. Read more in packages/jui/cypress/NOTES.md
 */
function workaroundHoverIssue() {
  cy.get("body").realHover();
}

describe("Tooltip", () => {
  it("renders as expected", () => {
    cy.mount(
      <>
        <div style={{ padding: 8 }}>
          <ActionTooltipStories.Default />
        </div>
        <div style={{ padding: 8 }}>
          <ActionTooltipStories.Long />
        </div>
        <div style={{ padding: 8 }}>
          <ActionTooltipStories.WithShortcut />
        </div>

        <div style={{ padding: 8 }}>
          <ActionHelpTooltipStories.Default />
        </div>
        <div style={{ padding: 8 }}>
          <ActionHelpTooltipStories.WithShortcut />
        </div>
        <div style={{ padding: 8 }}>
          <ActionHelpTooltipStories.WithLink />
        </div>
        <div style={{ padding: 8 }}>
          <ActionHelpTooltipStories.WithShortcutAndLink />
        </div>

        <div style={{ padding: 8 }}>
          <HelpTooltipStories.Default />
        </div>
        <div style={{ padding: 8 }}>
          <HelpTooltipStories.WithShortcut />
        </div>
        <div style={{ padding: 8 }}>
          <HelpTooltipStories.WithLink />
        </div>
        <div style={{ padding: 8 }}>
          <HelpTooltipStories.WithShortcutAndLink />
        </div>
      </>
    );
    matchImageSnapshot("AllTooltips");
  });

  it("renders the arrow in the right position", () => {
    cy.viewport(350, 1200);
    cy.mount(
      <>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer
            helpText="enabled with default pointer position"
          />
        </div>
        {(["right", "left", "top", "bottom"] as const).map((side) => (
          <div key={side} style={{ padding: 16 }}>
            <HelpTooltipStories.Default
              withPointer={{ side }}
              helpText={
                <>
                  Pointer on {side}. <br /> offset unset
                </>
              }
            />
          </div>
        ))}
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{ side: "top", offset: 0 }}
            helpText={
              <>
                Too small horizontal offset edge case. The arrow should not go
                outside the tooltip boundary
              </>
            }
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{ side: "top", offset: 400 }}
            helpText={
              <>
                Too large horizontal offset edge case. The arrow should not go
                outside the tooltip boundary
              </>
            }
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{ side: "right", offset: 0 }}
            helpText={
              <>
                Too small vertical offset edge case. The arrow should not go
                outside the tooltip boundary
              </>
            }
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{ side: "right", offset: 400 }}
            helpText={
              <>
                Too large vertical offset edge case. The arrow should not go
                outside the tooltip boundary
              </>
            }
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{
              side: "top",
              offset: "20%",
            }}
            helpText={<>Percentage offset</>}
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{ side: "top", offset: { invert: true, value: 20 } }}
            helpText={<>Inverted offset</>}
          />
        </div>
        <div style={{ padding: 16 }}>
          <HelpTooltipStories.Default
            withPointer={{
              side: "top",
              offset: { invert: true, value: "20%" },
            }}
            helpText={<>Inverted percentage offset</>}
          />
        </div>
      </>
    );
    matchImageSnapshot("Tooltip-WithPointer");
  });
});

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[aria-busy=true]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
