import React from "react";
import {
  StyledSpacer,
  StyledToolWindowStripe,
  StyledToolWindowStripeProps,
} from "../StyledToolWindowStripe";
import { StyledToolWindowStripeButton } from "../StyledToolWindowStripeButton";
import {
  ComponentArgTypes,
  styledComponentsControlsExclude,
} from "../../story-helpers";
import { Meta } from "@storybook/react";

// ComponentProps<typeof StyledToolWindowStripe> doesn't work as expected :(
type StoryProps = StyledToolWindowStripeProps & { empty: boolean };

export default {
  title: "Components/ToolWindow",
} as Meta;

const newVar: ComponentArgTypes<StoryProps> = {
  empty: { type: "boolean" },
  anchor: { defaultValue: "left" },
};
export const StyledStripe = {
  render: (props: StoryProps) => {
    const { anchor, empty } = props;
    return (
      <div style={{ height: "calc(100vh - 50px)" }}>
        <StyledToolWindowStripe {...props}>
          {!empty && (
            <>
              <StyledToolWindowStripeButton active anchor={anchor}>
                {anchor} - Active
              </StyledToolWindowStripeButton>
              <StyledToolWindowStripeButton anchor={anchor}>
                {anchor} - Inactive
              </StyledToolWindowStripeButton>
              <StyledSpacer />
              <StyledToolWindowStripeButton active anchor={anchor}>
                {anchor} - Split 1
              </StyledToolWindowStripeButton>
              <StyledToolWindowStripeButton anchor={anchor}>
                {anchor} - Split 2
              </StyledToolWindowStripeButton>
            </>
          )}
        </StyledToolWindowStripe>
      </div>
    );
  },

  argTypes: newVar,

  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
    component: StyledToolWindowStripe,
  },
};
