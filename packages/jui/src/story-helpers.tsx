import { Legend, legends } from "../test-data";
import { Item, Section } from "@react-stately/collections";
import React, { ReactNode } from "react";
import { Divider, DividerItem } from "./Collections/Divider";
import { ArgTypes } from "@storybook/react";

export const renderItemCustomUI = (item: Legend, content?: ReactNode) => (
  <Item key={item.name} textValue={item.name}>
    <div style={{ height: 40, display: "flex", alignItems: "center" }}>
      🎸 &nbsp;
      <b>{content || item.name}</b>
    </div>
  </Item>
);
export const itemRenderer = (
  renderItem: (item: Legend, content?: ReactNode) => JSX.Element,
  content?: ReactNode
) => (item: typeof legends[number]) => {
  if (item instanceof DividerItem) {
    return <Divider key={item.key} />;
  }
  if ("items" in item) {
    return (
      <Section items={item.items} key={item.title} title={item.title}>
        {(item) => renderItem(item, content)}
      </Section>
    );
  }
  return renderItem(item as Legend, content);
};
export const renderItemString = (item: Legend) => (
  <Item key={item.name} textValue={item.name}>
    {item.name}
  </Item>
);
export const styledComponentsControlsExclude = [
  "theme",
  "as",
  "forwardedAs",
  "ref",
];

// we could have accept component type instead of prop type, but this way refactoring
// in component props interface is handled better
export type ComponentArgTypes<P> = {
  [key in keyof P]?: ArgTypes[string];
};
