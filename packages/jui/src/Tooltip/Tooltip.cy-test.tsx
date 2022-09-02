import { mount } from "@cypress/react";
import React from "react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./TooltipTrigger.stories";
import * as helpTooltipStories from "./HelpTooltip.stories";
import * as actionHelpTooltipStories from "./ActionHelpTooltip.stories";
import * as actionTooltipStories from "./ActionTooltip.stories";

const { Default, Interactive } = composeStories(stories);
const HelpTooltipStories = composeStories(helpTooltipStories);
const ActionHelpTooltipStories = composeStories(actionHelpTooltipStories);
const ActionTooltipStories = composeStories(actionTooltipStories);

describe("TooltipTrigger", () => {
  it("opens the tooltip on hover, and closes it when trigger area is left", () => {
    // https://jetbrains.github.io/ui/controls/tooltip/#17
    // https://jetbrains.github.io/ui/controls/tooltip/#18
    mount(<Default />);
    workaroundHoverIssue();
    cy.get("button").first().realHover();

    cy.get("[role=tooltip]") // waiting for tooltip to appear
      .realMouseMove(10, 10); // moving mouse out of the trigger and onto the tooltip.
    cy.get("[role=tooltip]").should("not.exist"); //tooltip should be closed
  });

  it("allows user to click links in a tooltip, if any", () => {
    // https://jetbrains.github.io/ui/controls/tooltip/#20
    mount(<Interactive />);
    workaroundHoverIssue();
    cy.get("button").realHover();

    cy.get("[role=tooltip]") // waiting for tooltip to appear
      .realMouseMove(10, 10); // moving mouse out of the trigger and onto the tooltip.
    cy.get("[role=tooltip]"); //tooltip should not be closed
  });
});

/**
 * Workaround for @react-aria/interaction issues with `realHover`. Read more in packages/jui/cypress/NOTES.md
 */
function workaroundHoverIssue() {
  cy.get("body").realHover();
}

describe("Tooltip", () => {
  it("renders as expected", () => {
    mount(
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
});

function matchImageSnapshot(snapshotsName: string) {
  // with percy
  cy.get("[data-loading-icon]").should("not.exist");
  cy.percySnapshot(snapshotsName);

  // or local snapshot testing
  // cy.document().toMatchImageSnapshot({
  //   name: snapshotsName,
  // });
}
