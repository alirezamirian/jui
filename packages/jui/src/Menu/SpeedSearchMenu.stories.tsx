import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { DividerItem, Item } from "@intellij-platform/core/Collections";
import {
  ActionButton,
  ActionToolbar,
  MenuTrigger,
} from "@intellij-platform/core";
import { Section } from "@react-stately/collections";

import { styledComponentsControlsExclude } from "../story-helpers";
import { SpeedSearchMenu, SpeedSearchMenuProps } from "./SpeedSearchMenu";
import { ExampleMenuItem, renderItem, viewModeItems } from "./story-helpers";

const items: Array<ExampleMenuItem> = [
  { title: "All" },
  { title: "Select..." },
  { title: "Select in Tree..." },
  {
    title: "View Mode",
    subItems: viewModeItems,
  },
  new DividerItem(),
  {
    title: "Group tabs",
    icon: "toolwindows/documentation",
  },
];

export default {
  title: "Components/SpeedSearchMenu",
  component: SpeedSearchMenu,
  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
  },
  args: {
    items,
    children: renderItem,
    onAction: (key) => {
      alert(`action: ${key}`);
    },
    onClose: () => {
      console.log("close");
    },
  },
} as Meta<SpeedSearchMenuProps<unknown>>;

const Template: StoryFn<SpeedSearchMenuProps<ExampleMenuItem>> = (
  props: SpeedSearchMenuProps<ExampleMenuItem>
) => <SpeedSearchMenu {...props} />;

export const Default: StoryFn<SpeedSearchMenuProps<ExampleMenuItem>> =
  Template.bind(null);

export const WithSections: StoryFn<SpeedSearchMenuProps<ExampleMenuItem>> =
  Template.bind(null);

WithSections.args = {
  children: (
    <>
      <Section title="Local Branches">
        <Item title="master">
          <Item>Update</Item>
          <Item>Push</Item>
        </Item>
        <Item title="feat/speed-search-menu">
          <Item>Update</Item>
          <Item>Push</Item>
        </Item>
      </Section>
      <Section title="Remove Branches">
        <Item title="origin/master">
          <Item>Checkout</Item>
          <Item>New Branch from 'origin/master'...</Item>
        </Item>
        <Item>origin/feat/speed-search-menu</Item>
      </Section>
    </>
  ).props.children,
};
export const WithCustomEmptyText: StoryFn<
  SpeedSearchMenuProps<ExampleMenuItem>
> = Template.bind(null);
WithCustomEmptyText.args = {
  emptyText: "Nothing here",
};

export const WithTrigger = {
  render: ({
    menuProps: otherMenuProps,
  }: {
    menuProps: Partial<SpeedSearchMenuProps<any>>;
  }) => {
    return (
      <ActionToolbar>
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <SpeedSearchMenu
              items={items}
              disabledKeys={["Float"]}
              {...menuProps}
              {...otherMenuProps}
              onAction={(key) => {
                console.log("onAction", key);
              }}
            >
              {renderItem}
            </SpeedSearchMenu>
          )}
        >
          {(props, ref) => (
            <ActionButton {...props} ref={ref}>
              <PlatformIcon icon={"general/gearPlain"} />
            </ActionButton>
          )}
        </MenuTrigger>
      </ActionToolbar>
    );
  },
};
