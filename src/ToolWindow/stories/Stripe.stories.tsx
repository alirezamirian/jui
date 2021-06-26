import React, { useState } from "react";
import { StyledToolWindowStripeProps } from "../StyledToolWindowStripe";
import {
  ComponentArgTypes,
  styledComponentsControlsExclude,
} from "../../story-helpers";
import { Meta } from "@storybook/react";
import { ToolWindowStripe } from "../ToolWindowStripe";

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
  const [items, setItems] = useState([
    { name: "Projects" },
    { name: "Structure" },
  ]);
  const [splitItems, setSplitItems] = useState([
    { name: "Favourites" },
    { name: "npm" },
  ]);

  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        [paddingProp]: 50,
      }}
    >
      <ToolWindowStripe
        anchor={anchor}
        onItemDropped={({ items, splitItems }) => {
          setItems(items);
          setSplitItems(splitItems);
        }}
        items={items}
        splitItems={splitItems}
        getKey={(item) => item.name}
        renderItem={(item) => item.name}
      />
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
