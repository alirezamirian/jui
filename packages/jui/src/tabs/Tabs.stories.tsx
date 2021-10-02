import { Meta } from "@storybook/react";
import { StyledDebuggerTab } from "jui/tabs/StyledDebuggerTab";
import { StyledEditorTab } from "jui/tabs/StyledEditorTab";
import { StyledTabs } from "jui/tabs/StyledTabs";
import { StyledToolWindowTab } from "jui/tabs/StyledToolWindowTab";
import React from "react";
import { Container } from "../story-components";
import { StyledDefaultTab } from "./StyledDefaultTab";

export default {
  title: "Components/Tabs",
} as Meta;

export const Styled = (): React.ReactElement => {
  return (
    <Container>
      <h3>StyledDefaultTab</h3>
      <StyledTabs>
        <StyledDefaultTab>Default tab</StyledDefaultTab>
        <StyledDefaultTab selected>Selected tab</StyledDefaultTab>
        <StyledDefaultTab disabled>Disabled tab</StyledDefaultTab>
        <StyledDefaultTab selected active>
          Selected & active tab
        </StyledDefaultTab>
      </StyledTabs>
      <br />

      <h3>StyledEditorTab</h3>
      <StyledTabs>
        <StyledEditorTab>Default tab</StyledEditorTab>
        <StyledEditorTab selected>Selected tab</StyledEditorTab>
        <StyledEditorTab disabled>Disabled tab</StyledEditorTab>
        <StyledEditorTab selected active>
          Selected & active tab
        </StyledEditorTab>
      </StyledTabs>
      <br />

      <h3>StyledToolWindowTab</h3>
      <StyledTabs>
        <StyledToolWindowTab>Default tab</StyledToolWindowTab>
        <StyledToolWindowTab selected>Selected tab</StyledToolWindowTab>
        <StyledToolWindowTab disabled>Disabled tab</StyledToolWindowTab>
        <StyledToolWindowTab selected active>
          Selected & active tab
        </StyledToolWindowTab>
      </StyledTabs>
      <br />

      <h3>StyledDebuggerTab</h3>
      <StyledTabs>
        <StyledDebuggerTab>Tabs.stories.tsx</StyledDebuggerTab>
        <StyledDebuggerTab selected>Selected tab</StyledDebuggerTab>
        <StyledDebuggerTab disabled>Disabled tab</StyledDebuggerTab>
        <StyledDebuggerTab selected active>
          Selected & active tab
        </StyledDebuggerTab>
      </StyledTabs>
    </Container>
  );
};
