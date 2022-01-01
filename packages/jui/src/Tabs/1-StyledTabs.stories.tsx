import React from "react";
import { Meta } from "@storybook/react";
import { Container } from "../story-components";
import { StyledEditorTab } from "./EditorTabs/StyledEditorTab";
import { StyledDebuggerTab } from "./DebuggerTabs/StyledDebuggerTab";
import { StyledDefaultTab } from "./StyledDefaultTab";
import { StyledDefaultTabs } from "./StyledDefaultTabs";
import { StyledToolWindowTab } from "./ToolWindowTabs/StyledToolWindowTab";

export default {
  title: "Components/Tabs/Styled Components",
  component: StyledDefaultTabs,
  subcomponents: {
    StyledDefaultTab,
    StyledDebuggerTab,
    StyledEditorTab,
    StyledToolWindowTab,
  },
} as Meta;

export const StyledComponents = (): React.ReactElement => {
  return (
    <Container>
      <h3>StyledDefaultTab</h3>
      <StyledDefaultTabs>
        <StyledDefaultTab>Default tab</StyledDefaultTab>
        <StyledDefaultTab selected>Selected tab</StyledDefaultTab>
        <StyledDefaultTab disabled>Disabled tab</StyledDefaultTab>
        <StyledDefaultTab selected active>
          Selected & active tab
        </StyledDefaultTab>
      </StyledDefaultTabs>
      <br />

      <h3>StyledEditorTab</h3>
      <StyledDefaultTabs>
        <StyledEditorTab>Default tab</StyledEditorTab>
        <StyledEditorTab selected>Selected tab</StyledEditorTab>
        <StyledEditorTab disabled>Disabled tab</StyledEditorTab>
        <StyledEditorTab selected active>
          Selected & active tab
        </StyledEditorTab>
      </StyledDefaultTabs>
      <br />

      <h3>StyledToolWindowTab</h3>
      <StyledDefaultTabs>
        <StyledToolWindowTab>Default tab</StyledToolWindowTab>
        <StyledToolWindowTab selected>Selected tab</StyledToolWindowTab>
        <StyledToolWindowTab disabled>Disabled tab</StyledToolWindowTab>
        <StyledToolWindowTab selected active>
          Selected & active tab
        </StyledToolWindowTab>
      </StyledDefaultTabs>
      <br />

      <h3>StyledDebuggerTab</h3>
      <StyledDefaultTabs>
        <StyledDebuggerTab>Tabs.stories.tsx</StyledDebuggerTab>
        <StyledDebuggerTab selected>Selected tab</StyledDebuggerTab>
        <StyledDebuggerTab disabled>Disabled tab</StyledDebuggerTab>
        <StyledDebuggerTab selected active>
          Selected & active tab
        </StyledDebuggerTab>
      </StyledDefaultTabs>
    </Container>
  );
};
