import { Legend, legends } from "../../test-data";
import React, { ReactNode, useRef } from "react";
import { StoryFn } from "@storybook/react";
import {
  Divider,
  DividerItem,
  HighlightedTextValue,
  Item,
  List,
  ListProps,
  Section,
} from "@intellij-platform/core";

import { Pane } from "../story-components";

export const renderItemCustomUI = (item: Legend, content?: ReactNode) => (
  <Item key={item.name} textValue={item.name}>
    <div style={{ height: 40, display: "flex", alignItems: "center" }}>
      🎸 &nbsp;
      <b>{content || item.name}</b>
    </div>
  </Item>
);
export const itemRenderer =
  (
    renderItem: (item: Legend, content?: ReactNode) => JSX.Element,
    content?: ReactNode
  ) =>
  (item: (typeof legends)[number]) => {
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
export const renderItemText = (item: Legend) => (
  <Item key={item.name} textValue={item.name}>
    {item.name}
  </Item>
);
export const renderItemTextWithHighlights = (item: Legend) => (
  <Item key={item.name} textValue={item.name}>
    <HighlightedTextValue />
  </Item>
);

export const commonListStories = {
  withConnectedInput: (ListCmp: typeof List) => {
    const WithConnectedInput: StoryFn<ListProps<any>> = (props) => {
      const inputRef = useRef<HTMLInputElement>(null);
      const [isFocused, setIsFocused] = React.useState(false);
      const listRef = React.useRef<HTMLDivElement>(null);

      return (
        <Pane>
          <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <ListCmp
            ref={listRef}
            focusProxyRef={inputRef}
            selectionMode="single"
            items={legends}
            showAsFocused={isFocused}
            fillAvailableSpace
            {...props}
          >
            {itemRenderer(renderItemText)}
          </ListCmp>
        </Pane>
      );
    };
    return WithConnectedInput;
  },
};
