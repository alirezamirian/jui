import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import {
  ActionButton,
  Checkbox,
  PlatformIcon,
  Popup,
  PopupLayout,
  Pressable,
} from "@intellij-platform/core";
import { PopupTrigger, PopupTriggerProps } from "./PopupTrigger";
import {
  listPopupContent,
  MenuPopupContent,
  treePopupContent,
} from "./story-helpers";

export default {
  title: "Components/PopupTrigger",
  component: PopupTrigger,
  args: {
    children: (
      <ActionButton>
        <PlatformIcon icon="general/add" />
      </ActionButton>
    ),
    popup: (
      <Popup>
        <PopupLayout
          header={<Popup.Header>Title</Popup.Header>}
          content={
            <div style={{ padding: "0.375rem" }}>
              Popup Content. Popup Content.
            </div>
          }
        />
      </Popup>
    ),
  },
  parameters: {
    // Excluding onBoundsChanging for story performance only
    actions: { argTypesRegex: "^on((?!BoundsChanging).)*$" },
  },
  argTypes: {},
} as Meta<PopupTriggerProps>;

const Template: Story<PopupTriggerProps> = (props) => {
  return <PopupTrigger {...props} />;
};

export const Default = Template.bind(null);

export const Positioning: Story<PopupTriggerProps> = ({
  children,
  ...props
}) => {
  const [triggerPosition, setTriggerPosition] = useState({ left: 16, top: 16 });

  return (
    <div
      style={{ height: 2000, width: 2000 }}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) {
          setTriggerPosition({ left: e.pageX - 11, top: e.pageY - 11 });
        }
      }}
    >
      <PopupTrigger {...props}>
        <span
          title="Double click on the background to move this button to different positions"
          style={{ position: "absolute", ...triggerPosition }}
        >
          {children}
        </span>
      </PopupTrigger>
    </div>
  );
};

export const PlacementTop = Template.bind(null);
PlacementTop.args = {
  placement: "top",
};
PlacementTop.decorators = [
  (TheStory) => (
    <div style={{ marginTop: 50 }}>
      <TheStory />
    </div>
  ),
];

export const DefaultOpen = Template.bind(null);
DefaultOpen.args = {
  defaultOpen: true,
};
export const ControlledOpen: Story<PopupTriggerProps> = (props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div>
        <Checkbox isSelected={isOpen} onChange={setOpen}>
          Popup Open
        </Checkbox>
      </div>
      <PopupTrigger {...props} isOpen={isOpen} onOpenChange={setOpen} />
    </>
  );
};

export const DefaultSize = Template.bind(null);
DefaultSize.args = {
  popup: (
    <Popup
      defaultBounds={{
        width: 300,
        height: 200,
      }}
    >
      <PopupLayout
        header={<Popup.Header>Title</Popup.Header>}
        content={
          <div style={{ padding: "0.375rem" }}>
            Popup Content. Popup Content.
          </div>
        }
      />
    </Popup>
  ),
};

export const DefaultPosition = Template.bind(null);
DefaultPosition.args = {
  popup: (
    <Popup
      defaultBounds={{
        top: 100,
        left: 100,
      }}
    >
      <PopupLayout
        header={<Popup.Header>Title</Popup.Header>}
        content={
          <div style={{ padding: "0.375rem" }}>
            Popup Content. Popup Content.
          </div>
        }
      />
    </Popup>
  ),
};

export const NoResize = Template.bind({});
NoResize.args = {
  popup: (
    <Popup interactions="move">
      <PopupLayout
        header={<Popup.Header>Title</Popup.Header>}
        content={
          <div style={{ padding: "0.375rem" }}>
            Popup Content. Popup Content.
          </div>
        }
      />
    </Popup>
  ),
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  popup: (
    <Popup interactions="none">
      <PopupLayout
        header={<Popup.Header>Title</Popup.Header>}
        content={
          <div style={{ padding: "0.375rem" }}>
            Popup Content. Popup Content.
          </div>
        }
      />
    </Popup>
  ),
};

export const NonDismissable = Template.bind({});
NonDismissable.args = {
  popup: (
    <Popup nonDismissable>
      <PopupLayout
        header={<Popup.Header>Title</Popup.Header>}
        content={
          <div style={{ padding: "0.375rem" }}>
            Popup Content. Popup Content.
          </div>
        }
      />
    </Popup>
  ),
};

export const ListContent = Template.bind(null);
ListContent.args = {
  popup: <Popup>{listPopupContent}</Popup>,
};

export const TreeContent = Template.bind(null);
TreeContent.args = {
  popup: <Popup>{treePopupContent}</Popup>,
};

export const MenuContent = Template.bind(null);
MenuContent.args = {
  popup: ({ close }) => (
    <Popup interactions="none">
      <MenuPopupContent menuProps={{ onClose: close, onAction: alert }} />
    </Popup>
  ),
};

export const OnCustomTrigger = Template.bind(null);
OnCustomTrigger.args = {
  children: (
    <Pressable>
      <button>Custom trigger</button>
    </Pressable>
  ),
};
