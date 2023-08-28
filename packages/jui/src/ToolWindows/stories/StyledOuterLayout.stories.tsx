import { Meta } from "@storybook/react";
import React from "react";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { StyledToolWindowOuterLayout } from "../StyledToolWindowOuterLayout";
import { ToolWindowStripe } from "../ToolWindowStripe";

export default {
  title: "Components/ToolWindow",
} as Meta;

export const StyledOuterLayout = {
  render: ({ hideStripes }: { hideStripes: boolean }) => {
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
        <StyledToolWindowOuterLayout.InnerView>
          main area
        </StyledToolWindowOuterLayout.InnerView>
      </StyledToolWindowOuterLayout.Shell>
    );
  },

  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
    component: StyledToolWindowOuterLayout.Shell,
  },
};
