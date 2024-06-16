import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ActionTooltip,
  AutoHoverPlatformIcon,
  IconButton,
  PlatformIcon,
  StyledHoverContainer,
  TooltipTrigger,
} from "@intellij-platform/core";

import { Input, InputProps } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {},
} as Meta<InputProps>;

const render = (props: InputProps) => {
  return <Input {...props} />;
};

export const Default: StoryObj<InputProps> = {
  render: render,
};

export const Error: StoryObj<InputProps> = {
  render: render,
  args: {
    validationState: "error",
  },
};

export const Warning: StoryObj<InputProps> = {
  render: render,
  args: {
    validationState: "warning",
  },
};

export const Disabled: StoryObj<InputProps> = {
  render: render,
  args: {
    disabled: true,
  },
};

export const Embedded: StoryObj<InputProps> = {
  render: render,
  args: {
    appearance: "embedded",
    placeholder: "Embedded",
  },
};

export const EmbeddedError: StoryObj<InputProps> = {
  render: render,
  args: {
    appearance: "embedded",
    placeholder: "Embedded",
    validationState: "error",
  },
};

export const WithPlaceholder: StoryObj<InputProps> = {
  render: render,
  args: {
    placeholder: "Optional",
  },
};
export const WithAfterAddons: StoryObj<InputProps> = {
  render: render,

  args: {
    addonAfter: (
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Edit environment Variables (⇧⏎)" />}
      >
        {(props) => (
          <AutoHoverPlatformIcon
            {...props}
            style={{ marginRight: ".2rem" }}
            role="button"
            icon="general/inlineVariables"
          />
        )}
      </TooltipTrigger>
    ),
    placeholder: "Environment variables",
    style: { width: "min(300px, 90vw)" },
  },
};
export const WithBeforeAndAfterAddons: StoryObj<InputProps> = {
  render: render,
  args: {
    addonBefore: <PlatformIcon icon="actions/search.svg" />,
    addonAfter: (
      <>
        <TooltipTrigger tooltip={<ActionTooltip actionName="Match Case" />}>
          <StyledHoverContainer as={IconButton} excludeFromTabOrder={false}>
            <AutoHoverPlatformIcon
              icon="actions/regex"
              hoverIcon="actions/regexHovered"
            />
          </StyledHoverContainer>
        </TooltipTrigger>
        <TooltipTrigger tooltip={<ActionTooltip actionName="Regex" />}>
          <StyledHoverContainer as={IconButton} excludeFromTabOrder={false}>
            <AutoHoverPlatformIcon
              icon="actions/matchCase.svg"
              hoverIcon="actions/matchCaseHovered.svg"
            />
          </StyledHoverContainer>
        </TooltipTrigger>
      </>
    ),
  },
};
