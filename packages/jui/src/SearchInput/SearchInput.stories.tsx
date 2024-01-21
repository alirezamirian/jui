import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { SearchInput, SearchInputProps } from "./SearchInput";
import {
  ActionTooltip,
  AutoHoverPlatformIcon,
  IconButton,
  styled,
  StyledHoverContainer,
  TooltipTrigger,
} from "@intellij-platform/core";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  args: {
    style: {
      width: 250,
    },
  },
  argTypes: {},
} as Meta<SearchInputProps>;

const StyledSearchValueResult = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.color("*.foreground")};
`;
const render = (props: SearchInputProps) => {
  const [submittedValue, setSubmittedValue] = React.useState("");
  return (
    <>
      <SearchInput {...props} onSubmit={setSubmittedValue} />
      <StyledSearchValueResult>
        Submitted value: {submittedValue}
      </StyledSearchValueResult>
    </>
  );
};

export const Default: StoryObj<SearchInputProps> = {
  render,
};

export const WithHistory: StoryObj<SearchInputProps> = {
  render,
  args: {
    searchHistory: ["search query 1", "search query 2"],
  },
};

export const WithAfterAddons: StoryObj<SearchInputProps> = {
  render,
  args: {
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
