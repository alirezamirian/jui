import React, { ComponentProps } from "react";
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

export default {
  title: "ToolWindow",
} as Meta;
export const StyledStripe = (
  props: ComponentProps<typeof StyledToolWindowStripe>
) => {
  const { anchor = "bottom" } = props;
  return (
    <div style={{ height: "calc(100vh - 50px)" }}>
      <StyledToolWindowStripe anchor={anchor} acceptsDrop={props.acceptsDrop}>
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
      </StyledToolWindowStripe>
    </div>
  );
};

const newVar: ComponentArgTypes<StyledToolWindowStripeProps> = {
  anchor: { defaultValue: "left" },
};

StyledStripe.argTypes = newVar;

StyledStripe.parameters = {
  controls: { exclude: styledComponentsControlsExclude },
  component: StyledToolWindowStripe,
};
