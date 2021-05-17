import React, { ComponentProps } from "react";
import {
  StyledToolWindowStripe,
  StyledToolWindowStripeProps,
} from "../StyledToolWindowStripe";
import {
  ComponentArgTypes,
  styledComponentsControlsExclude,
} from "../../story-helpers";
import { Meta } from "@storybook/react";
import { SplitItems, ToolWindowStripe } from "../ToolWindowStripe";
import { Item } from "@react-stately/collections";

export default {
  title: "ToolWindow",
} as Meta;
export const Stripe = (
  props: ComponentProps<typeof StyledToolWindowStripe>
) => {
  const { anchor = "bottom" } = props;
  return (
    <div style={{ height: "calc(100vh - 50px)" }}>
      <ToolWindowStripe anchor={anchor}>
        <Item>Project</Item>
        <Item>Structure</Item>
        <SplitItems>
          <Item>Favorites</Item>
          <Item>npm</Item>
        </SplitItems>
      </ToolWindowStripe>
    </div>
  );
};

const newVar: ComponentArgTypes<StyledToolWindowStripeProps> = {
  anchor: { defaultValue: "left" },
};

Stripe.argTypes = newVar;

Stripe.parameters = {
  controls: { exclude: styledComponentsControlsExclude },
  component: ToolWindowStripe,
};
