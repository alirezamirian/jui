import React from "react";
import {
  ActionGroupDefinition,
  ActionItem,
  ActionsMenu,
  ActionsProvider,
  useAction,
} from "@intellij-platform/core";

describe("ActionsMenu", () => {
  it("passes aria-label down to the menu component", () => {
    cy.mount(<ActionsMenu actions={[]} aria-label="My action menu" />);
    cy.findByRole("menu", { name: "My action menu" });
  });

  it("renders menu item for actions", () => {
    const action1 = cy.stub().as("Action 1");
    const action2 = cy.stub().as("Action 1");
    const MyActionMenu = () => {
      return (
        <ActionsMenu
          actions={[useAction("Action 1"), useAction("Action 2")].filter(
            (i) => i != null
          )}
        />
      );
    };
    cy.mount(
      <ActionsProvider
        actions={[
          {
            id: "Action 1",
            title: "Action 1",
            actionPerformed: action1,
          },
          {
            id: "Action 2",
            title: "Action 2",
            actionPerformed: action2,
          },
        ]}
      >
        {() => <MyActionMenu />}
      </ActionsProvider>
    );
    cy.findByRole("menuitem", { name: "Action 1" });
    cy.findByRole("menuitem", { name: "Action 2" });
  });

  it("renders nested menu for groups with menuPresentation set to 'submenu'", () => {
    const actionGroup1 = cy.stub().as("Action Group 1");
    const action1 = cy.stub().as("Action 1");
    const MyActionMenu = () => {
      return (
        <ActionsMenu
          actions={[useAction("Action Group 1")].filter((i) => i != null)}
        />
      );
    };
    cy.mount(
      <ActionsProvider
        actions={[
          {
            id: "Action Group 1",
            title: "Action Group 1",
            actionPerformed: actionGroup1,
            menuPresentation: "submenu",
            children: [
              {
                id: "Action 1",
                title: "Action 1",
                actionPerformed: action1,
              },
            ],
          } as ActionGroupDefinition,
        ]}
      >
        {() => <MyActionMenu />}
      </ActionsProvider>
    );
    cy.findByRole("menuitem", { name: "Action 1" }).should("not.exist");
    cy.findByRole("group", { name: "Action Group 1" }).should("not.exist");
    cy.findByRole("menuitem", { name: "Action Group 1" }).click();
    cy.findByRole("menuitem", { name: "Action 1" });
  });

  it("renders menu section for groups with menuPresentation set to 'section'", () => {
    const actionGroup1 = cy.stub().as("Action Group 1");
    const action1 = cy.stub().as("Action 1");
    const MyActionMenu = () => {
      return (
        <ActionsMenu
          actions={[useAction("Action Group 1")].filter((i) => i != null)}
        />
      );
    };
    cy.mount(
      <ActionsProvider
        actions={[
          {
            id: "Action Group 1",
            title: "Action Group 1",
            actionPerformed: actionGroup1,
            menuPresentation: "section",
            children: [
              {
                id: "Action 1",
                title: "Action 1",
                actionPerformed: action1,
              },
            ],
          } as ActionGroupDefinition,
        ]}
      >
        {() => <MyActionMenu />}
      </ActionsProvider>
    );
    cy.findByRole("menuitem", { name: "Action 1" });
    cy.findByRole("group");
  });

  it("triggers the action group when menuPresentation set to 'none'", () => {
    const actionGroup1 = cy.stub().as("Action Group 1");
    const action1 = cy.stub().as("Action 1");
    const MyActionMenu = () => {
      return (
        <ActionsMenu
          actions={[useAction("Action Group 1")].filter((i) => i != null)}
        />
      );
    };
    cy.mount(
      <ActionsProvider
        actions={[
          {
            id: "Action Group 1",
            title: "Action Group 1",
            actionPerformed: actionGroup1,
            menuPresentation: "none",
            children: [
              {
                id: "Action 1",
                title: "Action 1",
                actionPerformed: action1,
              },
            ],
          } as ActionGroupDefinition,
        ]}
      >
        {() => <MyActionMenu />}
      </ActionsProvider>
    );
    cy.findByRole("menuitem", { name: "Action 1" }).should("not.exist");
    cy.findByRole("group", { name: "Action Group 1" }).should("not.exist");
    cy.findByRole("menuitem", { name: "Action Group 1" }).click();
    cy.wrap(actionGroup1).should("be.calledOnce");
  });

  it("performs selected action", () => {
    const action1 = cy.stub().as("Action 1");
    const action2 = cy.stub().as("Action 2");
    const actionGroup1 = cy.stub().as("Action Group 1");
    const actionGroup1Action1 = cy.stub().as("Action Group 1 - Action 1");
    const MyActionMenu = () => {
      return (
        <ActionsMenu
          actions={[
            useAction("Action 1"),
            useAction("Action Group 1"),
            {
              id: "group 2",
              title: "Group 2 (not an action group)",
              menuPresentation: "submenu",
              children: [useAction("Action 2")],
            } as ActionItem,
          ].filter((i) => i != null)}
        />
      );
    };
    cy.mount(
      <ActionsProvider
        actions={[
          {
            id: "Action 1",
            title: "Action 1",
            actionPerformed: action1,
          },
          {
            id: "Action Group 1",
            title: "Action Group 1",
            actionPerformed: actionGroup1,
            menuPresentation: "submenu",
            children: [
              {
                id: "Action Group 1 - Action 1",
                title: "Action Group 1 - Action 1",
                actionPerformed: actionGroup1Action1,
              },
            ],
          } as ActionGroupDefinition,
          {
            id: "Action 2",
            title: "Action 2",
            actionPerformed: action2,
          },
        ]}
      >
        {() => <MyActionMenu />}
      </ActionsProvider>
    );

    // Triggering action (outside any group)
    cy.findByRole("menuitem", { name: "Action 1" }).click();
    cy.get("@Action 1").should("be.calledOnce");

    // Triggering action in action group
    cy.findByRole("menuitem", { name: "Action Group 1" }).click();
    cy.findByRole("menuitem", { name: "Action Group 1 - Action 1" }).click();
    cy.get("@Action Group 1 - Action 1").should("be.calledOnce");

    // Triggering action in inline groups
    cy.findByRole("menuitem", {
      name: "Group 2 (not an action group)",
    }).click();
    cy.findByRole("menuitem", { name: "Action 2" }).click();
    cy.get("@Action 2").should("be.calledOnce");
  });
});
