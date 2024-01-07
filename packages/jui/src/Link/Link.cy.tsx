import React from "react";
import { composeStories } from "@storybook/react";
import * as stories from "./Link.stories";

const { Default, PreventFocusOnPress, ExcludeFromTabOrder } =
  composeStories(stories);

describe("Link", () => {
  it("works!", () => {
    const onPress = cy.stub();
    cy.mount(<Default onPress={onPress} />);
    matchImageSnapshot("Link-default");
    cy.contains("Open something something").click();
    cy.mount(<Default isDisabled />);
    matchImageSnapshot("Link-disabled");
    cy.contains("Open something something").click();
    cy.wrap(onPress).should("have.been.calledOnce");
  });

  it("supports preventing focus on press", () => {
    cy.mount(<PreventFocusOnPress />);
    cy.findByRole("link").click().should("not.be.focused");
  });

  it("supports exclusion from tab order", () => {
    cy.mount(
      <div>
        <input />
        <ExcludeFromTabOrder />
      </div>
    );
    cy.get("input").focus().realPress("Tab");
    cy.findByRole("link").should("not.be.focused");
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
