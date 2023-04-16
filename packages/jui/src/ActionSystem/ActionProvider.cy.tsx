import React from "react";
import {
  ActionsProvider,
  getAvailableActionsFor,
  KeymapProvider,
} from "@intellij-platform/core";
import { mergeProps } from "@react-aria/utils";

function TestKeymap({ children }: { children: React.ReactNode }) {
  return (
    <KeymapProvider
      keymap={{
        action1: [{ type: "keyboard", firstKeyStroke: { code: "KeyA" } }],
        action2: [{ type: "keyboard", firstKeyStroke: { code: "KeyB" } }],
      }}
    >
      {children}
    </KeymapProvider>
  );
}
const actions = {
  action1: {
    title: "Test action",
    actionPerformed: () => {},
  },
};
const actions2 = {
  action2: {
    title: "Test action 2",
    actionPerformed: () => {},
  },
};
describe("ActionProvider", () => {
  it("works in simple cases", () => {
    const action1 = cy.spy(actions.action1, "actionPerformed");
    cy.mount(
      <TestKeymap>
        <ActionsProvider actions={actions}>
          {({ shortcutHandlerProps }) => (
            <div {...shortcutHandlerProps}>
              <input />
            </div>
          )}
        </ActionsProvider>
      </TestKeymap>
    );
    cy.get("input")
      .focus()
      .type("A")
      // whether the default action (filling input) should be prevented or not is not quite clear at the moment
      .should("be.empty");
    cy.wrap(action1).should("have.been.calledOnce");
  });
});

describe("getAvailableActionsFor", () => {
  it("includes all actions, when props from multiple action provider are applied on the same element", () => {
    cy.mount(
      <TestKeymap>
        <ActionsProvider actions={actions}>
          {({ shortcutHandlerProps }) => (
            <ActionsProvider actions={actions2}>
              {({ shortcutHandlerProps: shortcutHandlerProps2 }) => (
                <div
                  {...mergeProps(shortcutHandlerProps, shortcutHandlerProps2)}
                >
                  <input />
                </div>
              )}
            </ActionsProvider>
          )}
        </ActionsProvider>
      </TestKeymap>
    );
    cy.get("input").then((input) => {
      expect(getAvailableActionsFor(input[0])).to.have.length(2);
    });

    cy.mount(
      <TestKeymap>
        <ActionsProvider actions={actions}>
          {({ shortcutHandlerProps }) => (
            <ActionsProvider actions={actions2}>
              {({ shortcutHandlerProps: shortcutHandlerProps2 }) => (
                <div
                  {...mergeProps(shortcutHandlerProps2, shortcutHandlerProps)}
                >
                  <input />
                </div>
              )}
            </ActionsProvider>
          )}
        </ActionsProvider>
      </TestKeymap>
    );
    cy.get("input").then((input) => {
      expect(getAvailableActionsFor(input[0])).to.have.length(2);
    });
  });
});
