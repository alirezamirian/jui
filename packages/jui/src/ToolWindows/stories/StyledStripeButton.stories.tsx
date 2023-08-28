import { Meta } from "@storybook/react";
import React from "react";
import {
  StyledToolWindowStripeButton,
  StyledToolWindowStripeButtonProps,
} from "../StyledToolWindowStripeButton";
import { styledComponentsControlsExclude } from "../../story-helpers";

export default {
  title: "Components/ToolWindow",
} as Meta;

export const StripeButton = {
  render: (props: StyledToolWindowStripeButtonProps) => {
    const { anchor = "left" } = props;
    return (
      <>
        <p>Note: background is meant to be semi-transparent</p>
        <StyledToolWindowStripeButton {...props} anchor={anchor}>
          Anchor: {anchor}
        </StyledToolWindowStripeButton>
      </>
    );
  },

  argTypes: {
    anchor: { defaultValue: "left" },
    active: { defaultValue: true },
  },

  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
    component: StyledToolWindowStripeButton,
  },
};
