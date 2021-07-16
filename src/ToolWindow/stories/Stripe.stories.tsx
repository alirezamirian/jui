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
  const [items, setItems] = useState({
    main: [{ name: "Projects" }, { name: "Structure" }],
    split: [{ name: "Favourites" }, { name: "npm" }],
  });
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
          setItems({ main: items, split: splitItems });
        }}
        items={items.main}
        splitItems={items.split}
        getKey={(item) => item.name}
        renderItem={(item) => item.name}
      />
    </div>
  );
};

const argTypes: ComponentArgTypes<StyledToolWindowStripeProps> = {
  anchor: { defaultValue: "left" },
};

Stripe.argTypes = argTypes;

Stripe.parameters = {
  controls: { exclude: styledComponentsControlsExclude },
  component: ToolWindowStripe,
};
