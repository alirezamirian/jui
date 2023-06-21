import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  ActionButton,
  Checkbox,
  PlatformIcon,
  styled,
  FocusScope,
} from "@intellij-platform/core";

import {
  listPopupContent,
  MenuPopupContent,
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
export const MultipleRowHeader: Story<PopupProps> = (props) => (
  <Popup {...props} />
);

const StyledSearchFieldContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 1.85rem;
  align-items: center;
  padding: 0.125rem 0.75rem 0; // Not sure why, but alignment is off without 2px (0.125rem) padding top
  gap: 0.75rem;
  border: 1px solid
    ${({ theme }) => theme.color("SearchEverywhere.SearchField.borderColor")};
  border-width: 1px 0;
  input {
    all: unset;
    flex: 1;
    line-height: 1.25;

    &::selection {
      color: ${({ theme }) => theme.color("*.selectionForeground")};
      background: ${({ theme }) => theme.color("*.selectionBackground")};
    }
  }
`;

const StyledCustomHeader2 = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.commonColors.labelForeground};
  background: ${({ theme }) =>
    theme.color("SearchEverywhere.Header.background")};
  gap: 0.625rem;
  display: flex;
  height: 100%;
  padding: 0 1rem;
`;

const StyledTabs = styled.div`
  display: flex;
  height: 100%;
  button {
    all: unset;
    padding: 0.5rem 1rem;
  }
  .active {
    background: ${({ theme }) =>
      theme.color("SearchEverywhere.Tab.selectedBackground")};
  }
`;

const StyledSearchFieldHint = styled.div`
  color: ${({ theme }) =>
    theme.color("SearchEverywhere.SearchField.infoForeground")};
  white-space: nowrap;
`;
MultipleRowHeader.args = {
  interactions: "all",
  minWidth: "content",
  minHeight: 20,
  children: (
    <Popup.Layout
      header={
        <>
          <Popup.Header hasControls>
            <StyledCustomHeader2>
              <div style={{ flex: 1, height: "100%" }}>
                <StyledTabs
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <button>All</button>
                  <button>Classes</button>
                  <button className="active">Files</button>
                  <button>Symbols</button>
                  <button>Actions</button>
                </StyledTabs>
              </div>
              <Checkbox preventFocus>Include disabled actions</Checkbox>
            </StyledCustomHeader2>
          </Popup.Header>
          <StyledSearchFieldContainer>
            <PlatformIcon icon="actions/search" />
            <FocusScope contain>
              <input autoFocus />
            </FocusScope>
            <StyledSearchFieldHint>
              Press ⌥⏎ to assign a shortcut
            </StyledSearchFieldHint>
          </StyledSearchFieldContainer>
        </>
      }
      content={<div style={{ minHeight: 100, padding: "0.5rem" }}>Content</div>}
      footer={
        <Popup.Hint>
          Resize to see the order of things going out of the view: content,
          footer, header
        </Popup.Hint>
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
  children: <MenuPopupContent />,
};
