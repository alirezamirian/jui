import { Meta } from "@storybook/react";
import React from "react";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { ToolWindowStripe } from "../ToolWindowStripe";
import { StyledToolWindowOuterLayout } from "../StyledToolWindowOuterLayout";

export default {
  title: "ToolWindow",
} as Meta;

export const StyledOuterLayout = ({
  hideStripes,
}: {
  hideStripes: boolean;
}) => {
  return (
    <StyledToolWindowOuterLayout.Shell
      style={{ height: "100vh" }}
      hideStripes={hideStripes}
    >
      <StyledToolWindowOuterLayout.TopStripe>
        <ToolWindowStripe
          items={[{ name: "Project" }, { name: "Structure" }]}
          getKey={({ name }) => name}
          renderItem={({ name }) => name}
          anchor="top"
        />
      </StyledToolWindowOuterLayout.TopStripe>
      <StyledToolWindowOuterLayout.RightStripe>
        <ToolWindowStripe
          items={[{ name: "Project" }]}
          getKey={({ name }) => name}
          renderItem={({ name }) => name}
          anchor="right"
        />
      </StyledToolWindowOuterLayout.RightStripe>
      <StyledToolWindowOuterLayout.BottomStripe>
        <ToolWindowStripe
          items={[{ name: "Project" }]}
          getKey={({ name }) => name}
          renderItem={({ name }) => name}
          anchor="bottom"
        />
      </StyledToolWindowOuterLayout.BottomStripe>
      <StyledToolWindowOuterLayout.LeftStripe>
        <ToolWindowStripe
          items={[{ name: "Project" }]}
          getKey={({ name }) => name}
          renderItem={({ name }) => name}
          anchor="left"
        />
      </StyledToolWindowOuterLayout.LeftStripe>
      <div style={{ gridArea: "main" }}>main area</div>
    </StyledToolWindowOuterLayout.Shell>
  );
};

StyledOuterLayout.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: StyledToolWindowOuterLayout.Shell,
};
