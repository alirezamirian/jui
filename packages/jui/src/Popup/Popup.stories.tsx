import React from "react";
import { Meta, Story } from "@storybook/react";
import { ActionButton, PlatformIcon, styled } from "@intellij-platform/core";

import {
  listPopupContent,
  menuPopupContent,
  treePopupContent,
} from "./story-helpers";
import { Popup, PopupProps } from "./Popup";

export default {
  title: "Components/Popup",
  component: Popup,
  args: {
    children: (
      <Popup.Layout
        content={<div style={{ padding: "0.375rem" }}>Popup Content</div>}
        header={<Popup.Header>Popup Title</Popup.Header>}
      />
    ),
    id: "popup",
  },
  parameters: {
    // Excluding onBoundsChanging for story performance only
    actions: { argTypesRegex: "^on((?!BoundsChanging).)*$" },
  },
  argTypes: {},
} as Meta<PopupProps>;

const Template: Story<PopupProps> = (props) => {
  return (
    <div>
      <input />
      <Popup {...props} />
    </div>
  );
};
export const Default: Story<PopupProps> = Template.bind({});

export const MultiplePopups: Story = () => {
  return (
    <>
      <Popup
        defaultBounds={{
          height: 300,
          width: 350,
          left: 150,
          top: 250,
        }}
      >
        <Popup.Header>First popup</Popup.Header>
      </Popup>
      <Popup
        defaultBounds={{
          height: 200,
          width: 150,
          left: 100,
          top: 200,
        }}
      >
        <Popup.Header>Second popup</Popup.Header>
      </Popup>
      <Popup
        defaultBounds={{
          height: 150,
          width: 300,
          left: 150,
          top: 100,
        }}
      >
        <Popup.Header>Third popup</Popup.Header>
      </Popup>
    </>
  );
};

export const MinSizeContent = Template.bind({});
MinSizeContent.args = {
  children: (
    <>
      <Popup.Header>Title</Popup.Header>
      <div style={{ padding: "0.5rem" }}>
        Popup Content. Popup Content. <br />
        Popup Content. Popup Content. <br />
        Popup Content. Popup Content.
      </div>
    </>
  ),
  interactions: "all",
  minHeight: "content",
  minWidth: "content",
};

export const DefaultSize = Template.bind(null);
DefaultSize.args = {
  defaultBounds: {
    width: 300,
    height: 200,
  },
};

export const DefaultPosition = Template.bind(null);
DefaultPosition.args = {
  defaultBounds: {
    top: 100,
    left: 100,
  },
};
export const Resizable = Template.bind({});
Resizable.args = {
  interactions: "all",
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  interactions: "none",
};

export const NonDismissable = Template.bind({});
NonDismissable.args = {
  nonDismissable: true,
};

export const CustomHeader: Story<PopupProps> = (props) => <Popup {...props} />;

const StyledCustomHeader = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.commonColors.labelForeground};
  gap: 0.625rem;
  display: flex;
  align-items: center;
`;

const StyledCustomHeaderTitle = styled.div`
  overflow: hidden;
  flex: 1;
  padding-inline-start: 0.625rem;
`;

const StyledCustomHeaderMuted = styled.span`
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
`;

CustomHeader.args = {
  children: (
    <Popup.Layout
      header={
        <Popup.Header hasControls>
          <StyledCustomHeader>
            <StyledCustomHeaderTitle>
              Method <b>setActive(boolean)</b>&nbsp;
              <StyledCustomHeaderMuted>
                of com.intellij.ui.TitlePanel
              </StyledCustomHeaderMuted>
            </StyledCustomHeaderTitle>
            <span>6+ usages</span>
            <ActionButton>
              <PlatformIcon icon="actions/moveToBottomLeft" />
            </ActionButton>
          </StyledCustomHeader>
        </Popup.Header>
      }
      content={<div style={{ minHeight: 100, padding: "0.5rem" }}>Content</div>}
      footer={
        <Popup.Hint>Press ⌥⌘F7 again to search in 'Project files'</Popup.Hint>
      }
    />
  ),
};

export const WithHint: Story<PopupProps> = Template.bind({});
WithHint.args = {
  children: (
    <Popup.Layout
      content={<div style={{ padding: "0.375rem" }}>Popup Content</div>}
      header={<Popup.Header>Popup Title</Popup.Header>}
      footer={
        <Popup.Hint>Press ⌥⌘F7 again to search in 'Project files'</Popup.Hint>
      }
    />
  ),
};

export const ListContent = Template.bind(null);
ListContent.args = {
  children: listPopupContent,
};

export const TreeContent = Template.bind(null);
TreeContent.args = {
  children: treePopupContent,
};

export const MenuContent = Template.bind(null);
MenuContent.args = {
  children: menuPopupContent,
};
