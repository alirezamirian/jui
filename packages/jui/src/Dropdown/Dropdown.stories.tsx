import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Item, ItemLayout, Section } from "@intellij-platform/core/Collections";

import { PlatformIcon } from "../Icon";
import { Dropdown, DropdownProps } from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    defaultSelectedKey: "Info",
    label: "Output level:",
    children: [
      <Item key="Debug">Debug</Item>,
      <Item key="Info">Info</Item>,
      <Item key="Warning">Warning</Item>,
      <Item key="Error">Error</Item>,
    ],
  },
  argTypes: {},
} as Meta<DropdownProps<object>>;

const render = <T extends object>(props: DropdownProps<T>) => (
  <Dropdown {...props}></Dropdown>
);

export const Default: StoryObj<DropdownProps<object>> = {
  render,
};

export const LabelPlacement: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "Label above",
    labelPlacement: "above",
  },
};

export const WithNoVisibleLabel: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: undefined,
    "aria-label": "Output level",
  },
};

export const WidthDistribution: StoryObj<{ width: number }> = {
  render: ({ width = 210, ...props }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <Dropdown
          {...props}
          label="Long label (flexible width)"
          defaultSelectedKey="1"
          style={{ width }}
        >
          <Item key="1">Short</Item>
          <Item key="2">Long option</Item>
        </Dropdown>
        <Dropdown
          {...props}
          label="Dropdown stretching:"
          defaultSelectedKey="Info"
          style={{ width: width * 2 }}
        >
          <Item key="Debug">Debug</Item>
          <Item key="Info">Info</Item>
          <Item key="Warning">Warning</Item>
          <Item key="Error">Error</Item>
        </Dropdown>
        <Dropdown
          {...props}
          label="Dropdown not stretching:"
          labelPlacement="above"
          defaultSelectedKey="Info"
          style={{ width }}
        >
          <Item key="Debug">Debug</Item>
          <Item key="Info">Info</Item>
          <Item key="Warning">Warning</Item>
          <Item key="Error">Error</Item>
        </Dropdown>
      </div>
    );
  },
  argTypes: {
    width: { type: "number" },
  },
};

export const Disabled: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "Disabled",
    isDisabled: true,
  },
};

export const WithSection: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "With Sections",
    defaultSelectedKey: "project",
    children: [
      <Section title="Stored in Project">
        <Item key="project">Project</Item>
      </Section>,
      <Section title="Stored in IDE">
        <Item>Default</Item>
        <Item>Custom code style</Item>
        <Item>Emac</Item>
      </Section>,
    ],
  },
};

export const WithCustomOptions: StoryObj<
  DropdownProps<{ name: string; hint: string }>
> = {
  render,
  args: {
    label: "Module SDK:",
    items: [
      {
        name: "Project SDK",
        hint: "corretto-11",
      },
      {
        name: "openjdk-22",
        hint: 'Java version "22.0.1"',
      },
      {
        name: "12",
        hint: "Oracle OpenJDK version 12.0.1",
      },
    ],
    defaultSelectedKey: "Project SDK",
    children: ({ name, hint }) => (
      <Item key={name} textValue={`${name} ${hint}`}>
        <ItemLayout>
          <PlatformIcon icon="nodes/Module.svg" />
          {name}
          <ItemLayout.Hint>{hint}</ItemLayout.Hint>
        </ItemLayout>
      </Item>
    ),
  },
};

export const WithDisabledOptions: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "Disabled Options",
    defaultSelectedKey: "Error",
    disabledKeys: ["Debug", "Info"],
  },
};

export const FlippedMenu: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    style: {
      position: "absolute",
      bottom: 50,
    },
  },
};

export const WithContextHelp: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "Default Manifest:",
    defaultSelectedKey: "o1",
    children: [<Item key="o1">META-INF/MANIFEST.MF</Item>],
    contextHelp: "File location relative to a module's content root",
  },
};

export const WithContextHelpAfter: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "Plugin update policy:",
    defaultSelectedKey: "o1",
    children: [<Item key="o1">Default</Item>],
    contextHelp: "Ignored by Maven 3+",
    contextHelpPlacement: "after",
  },
};

export const WithError: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "With Error",
    validationState: "error",
  },
};

export const WithWarning: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    label: "With Warning",
    validationState: "warning",
  },
};

export const AutoFocus: StoryObj<DropdownProps<object>> = {
  render,
  args: {
    autoFocus: true,
  },
};
