import { Meta } from "@storybook/react";
import { clone, move } from "ramda";
import React, { useState } from "react";
import { styledComponentsControlsExclude } from "../../story-helpers";
import {
  MovableToolWindowStripeProviderProps,
  MovableToolWindowStripeProvider,
} from "../MovableToolWindowStripeProvider";
import { StyledToolWindowStripeProps } from "../StyledToolWindowStripe";
import { ToolWindowStripe } from "../ToolWindowStripe";
import { Anchor } from "../utils";

export default {
  title: "ToolWindow",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
    component: ToolWindowStripe,
  },
} as Meta;

type ToolWindowStripesData<T> = Record<
  Anchor,
  { main: Array<T>; split: Array<T> }
>;

const toolWindowStripes: ToolWindowStripesData<{ name: string }> = {
  left: {
    main: [{ name: "Commit" }, { name: "Projects" }, { name: "Structure" }],
    split: [{ name: "Favourites" }, { name: "npm" }],
  },
  right: {
    main: [{ name: "Job Explorer" }, { name: "Learn" }],
    split: [],
  },
  top: { main: [{ name: "Terminal" }, { name: "Event log" }], split: [] },
  bottom: { main: [{ name: "TODO" }], split: [] },
};

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
      <ToolWindowStripe
        anchor={anchor}
        items={toolWindowStripes.left.main}
        splitItems={toolWindowStripes.left.split}
        getKey={(item) => item.name}
        renderItem={(item) => item.name}
      />
    </div>
  );
};

const moveBetweenArrays = <T extends unknown>(
  source: T[],
  target: T[],
  from: number,
  to: number
) => {
  if (source === target) {
    const newArr = move(from, to, source);
    return [newArr, newArr];
  }
  const newSource = [...source];
  const newTarget = [...target];
  const movedItem = newSource.splice(from, 1);
  newTarget.splice(to, 0, ...movedItem);
  return [newSource, newTarget];
};

const useToolWindowStripesData = <T extends unknown>(
  initialData: ToolWindowStripesData<T>
) => {
  const [data, setData] = useState(initialData);

  const onMove: MovableToolWindowStripeProviderProps["onMove"] = ({
    from,
    to,
  }) => {
    const [source, target] = moveBetweenArrays(
      data[from.anchor][from.isSplit ? "split" : "main"],
      data[to.anchor][to.isSplit ? "split" : "main"],
      from.index,
      to.index
    );
    const newData = clone(data);
    newData[from.anchor][from.isSplit ? "split" : "main"] = source;
    newData[to.anchor][to.isSplit ? "split" : "main"] = target;
    setData(newData);
  };
  return {
    data,
    onMove,
  };
};

export const MovableStripeButtons = (props: {
  left: boolean;
  right: boolean;
  top: boolean;
}) => {
  const { data, onMove } = useToolWindowStripesData(toolWindowStripes);
  const renderStripe = (anchor: Anchor) => (
    <ToolWindowStripe
      anchor={anchor}
      items={data[anchor].main}
      splitItems={data[anchor].split}
      getKey={(item) => item.name}
      renderItem={(item) => item.name}
    />
  );
  const spacer = <span style={{ width: 200 }} />;
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "start",
        background:
          "repeating-linear-gradient(45deg, transparent 20px, rgba(0, 0, 0, 0.1) 40px)",
      }}
    >
      <MovableToolWindowStripeProvider onMove={onMove}>
        {props.left && renderStripe("left")}
        {spacer}
        {props.right && renderStripe("right")}
        {spacer}
        {props.top && renderStripe("top")}
      </MovableToolWindowStripeProvider>
    </div>
  );
};

MovableStripeButtons.argTypes = {
  left: { defaultValue: true, type: "boolean" },
  right: { defaultValue: true, type: "boolean" },
  top: { defaultValue: true, type: "boolean" },
};

Stripe.argTypes = {
  anchor: { defaultValue: "left" },
};
