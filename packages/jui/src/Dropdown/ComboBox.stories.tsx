import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Item, Section } from "@intellij-platform/core/Collections";
import {
  ComboBox,
  ComboBoxProps,
} from "@intellij-platform/core/Dropdown/ComboBox";

export default {
  title: "Components/ComboBox",
  component: ComboBox,
  args: {
    defaultSelectedKey: "build",
    label: "Script",
    children: [
      <Item key="start">start</Item>,
      <Item key="build">build</Item>,
      <Item key="test">test</Item>,
      <Item key="deploy">deploy</Item>,
    ],
    style: { margin: "40vh 25vw" },
  },
  argTypes: {},
} as Meta<ComboBoxProps<object>>;

const render = <T extends object>(props: ComboBoxProps<T>) => (
  <ComboBox {...props}></ComboBox>
);

export const Default: StoryObj<ComboBoxProps<object>> = {
  render,
};

export const Disabled: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "Disabled",
    isDisabled: true,
  },
};

export const WithDisabledOptions: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "Disabled Options",
    disabledKeys: ["build"],
  },
};

export const WithNoVisibleLabel: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: undefined,
    "aria-label": "Scripts",
  },
};

export const WithSection: StoryObj<ComboBoxProps<object>> = {
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

export const FlippedMenu: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    style: {
      position: "absolute",
      bottom: 50,
    },
  },
};
export const WidthDistribution: StoryObj<{ width: number }> = {
  render: ({ width = 300, ...props }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <ComboBox
          {...props}
          label="Long label (flexible width)"
          defaultSelectedKey="1"
          style={{ width }}
        >
          <Item key="1">Short</Item>
          <Item key="2">Long option</Item>
        </ComboBox>
        <ComboBox
          {...props}
          label="ComboBox stretching:"
          defaultSelectedKey="Info"
          style={{ width: width * 2 }}
        >
          <Item key="Debug">Debug</Item>
          <Item key="Info">Info</Item>
          <Item key="Warning">Warning</Item>
          <Item key="Error">Error</Item>
        </ComboBox>
        <ComboBox
          {...props}
          label="ComboBox not stretching with long label:"
          labelPlacement="above"
          defaultSelectedKey="Info"
          style={{ width }}
        >
          <Item key="Debug">Debug</Item>
          <Item key="Info">Info</Item>
          <Item key="Warning">Warning</Item>
          <Item key="Error">Error</Item>
        </ComboBox>
      </div>
    );
  },
  argTypes: {
    width: { type: "number" },
  },
};

export const WithContextHelp: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "Default Manifest:",
    defaultValue: "META-INF/MANIFEST.MF",
    children: [<Item key="o1">META-INF/MANIFEST.MF</Item>],
    inputProps: { size: 40 },
    contextHelp: "File location relative to a module's content root",
  },
};

export const WithContextHelpAfter: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "Zoom",
    defaultValue: "100%",
    children: [
      <Item>70%</Item>,
      <Item>80%</Item>,
      <Item>90%</Item>,
      <Item>100%</Item>,
      <Item>110%</Item>,
      <Item>125%</Item>,
      <Item>150%</Item>,
      <Item>175%</Item>,
      <Item>200%</Item>,
    ],
    inputProps: { size: 5 },
    contextHelp: "Change with ^⌥= or ^⌥-. Set to 100% with ^⌥0",
    contextHelpPlacement: "after",
  },
};
export const WithError: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "With error",
    validationState: "error",
  },
};

export const WithErrorMessage: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "With Error",
    validationState: "error",
    validationMessage: "Empty repository URL",
  },
};

export const WithWarning: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    label: "With warning",
    validationState: "warning",
  },
};

export const WithFiltering: StoryObj<ComboBoxProps<{ name: string }>> = {
  render: () => {
    const [value, setValue] = React.useState("");
    const items = [
      { name: "start" },
      { name: "build" },
      { name: "test" },
      { name: "deploy" },
    ];

    const filteredItems = React.useMemo(
      () =>
        items.filter((item) =>
          item.name.toLowerCase().startsWith(value.toLowerCase())
        ),
      [value]
    );
    return (
      <ComboBox items={filteredItems} value={value} onValueChange={setValue}>
        {({ name }) => <Item key={name}>{name}</Item>}
      </ComboBox>
    );
  },
};

export const AutoFocus: StoryObj<ComboBoxProps<object>> = {
  render,
  args: {
    autoFocus: true,
  },
};
