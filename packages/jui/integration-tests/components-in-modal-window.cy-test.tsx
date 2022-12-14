import React from "react";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";
import {
  ModalWindow,
  Theme,
  ThemeProvider,
  Tree,
} from "@intellij-platform/core";
import darculaThemeJson from "../themes/darcula.theme.json";
import { Item } from "@react-stately/collections";

describe("integration of modal window with Tree components", () => {
  it("closes when escape is pressed on SpeedSearchTree", () => {
    const onClose = cy.stub().as("onClose");
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <ModalWindow title="title" onClose={onClose}>
          <SpeedSearchTreeSample />
        </ModalWindow>
      </ThemeProvider>
    );
    cy.realType("a");
    cy.realPress("{esc}");
    cy.get("@onClose").should("not.have.been.calledOnce");
    cy.realPress("{esc}");
    cy.get("@onClose").should("have.been.calledOnce");
  });

  it("closes when escape is pressed on Tree", () => {
    const onClose = cy.stub().as("onClose");
    cy.mount(
      <ThemeProvider theme={new Theme(darculaThemeJson as any)}>
        <ModalWindow title="title" onClose={onClose}>
          <Tree
            selectionMode="multiple"
            defaultSelectedKeys={["List"]}
            defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
          >
            <Item key="index.ts">index.ts</Item>
            <Item title="List" key="List">
              <Item title="BasicList" key="BasicList">
                <Item>BasicList.stories.tsx</Item>
                <Item>BasicList.tsx</Item>
                <Item>BasicListItem.tsx</Item>
                <Item>useBasicList.ts</Item>
              </Item>

              <Item title="SpeedSearchList" key="SpeedSearchList">
                <Item>SpeedSearchList.stories.tsx</Item>
                <Item key="SpeedSearchList.tsx">SpeedSearchList.tsx</Item>
                <Item>SpeedSearchListItem.tsx</Item>
                <Item>useSpeedSearchList.ts</Item>
              </Item>
            </Item>
          </Tree>
        </ModalWindow>
      </ThemeProvider>
    );
    cy.realPress("{esc}");
    cy.get("@onClose").should("have.been.calledOnce");
  });
});
