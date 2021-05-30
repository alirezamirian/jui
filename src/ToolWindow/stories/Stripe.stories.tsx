import React from "react";
import { StyledToolWindowStripeProps } from "../StyledToolWindowStripe";
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
export const Stripe = (props: StyledToolWindowStripeProps) => {
  const { anchor = "bottom" } = props;
  const paddingProp = ({
    right: "paddingLeft",
    left: "paddingRight",
    bottom: "paddingTop",
    top: "paddingBottom",
  } as const)[anchor];
  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        [paddingProp]: 50,
      }}
    >
      <ToolWindowStripe anchor={anchor} onItemDropped={console.log}>
        <Item>Project</Item>
        <Item>Structure</Item>
        <SplitItems>
          <Item>
            <div data-key="$.1">Favorites</div>
          </Item>
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
