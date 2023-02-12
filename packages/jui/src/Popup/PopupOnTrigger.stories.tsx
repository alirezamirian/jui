import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import {
  ActionButton,
  Checkbox,
  PlatformIcon,
  Popup,
  Pressable,
} from "@intellij-platform/core";

import { PopupOnTrigger, PopupOnTriggerProps } from "./PopupOnTrigger";
import {
  listPopupContent,
  menuPopupContent,
  treePopupContent,
} from "./story-helpers";

export default {
  title: "Components/PopupOnTrigger",
  component: PopupOnTrigger,
  args: {
    trigger: (
      <ActionButton>
        <PlatformIcon icon="general/add" />
      </ActionButton>
    ),
    children: (
      <>
        <Popup.Header>Title</Popup.Header>
        <div style={{ padding: "0.375rem" }}>Popup Content. Popup Content.</div>
      </>
    ),
  },
  parameters: {
    // Excluding onBoundsChanging for story performance only
    actions: { argTypesRegex: "^on((?!BoundsChanging).)*$" },
  },
  argTypes: {},
} as Meta<PopupOnTriggerProps>;

const Template: Story<PopupOnTriggerProps> = (props) => {
  return <PopupOnTrigger {...props} />;
};

export const Default = Template.bind(null);

export const Positioning: Story<PopupOnTriggerProps> = ({
  trigger,
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
      <PopupOnTrigger
        {...props}
        trigger={
          <span
            title="Double click on the background to move this button to different positions"
            style={{ position: "absolute", ...triggerPosition }}
          >
            {trigger}
          </span>
        }
      />
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
export const ControlledOpen: Story<PopupOnTriggerProps> = (props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div>
        <Checkbox isSelected={isOpen} onChange={setOpen}>
          Popup Open
        </Checkbox>
      </div>
      <PopupOnTrigger {...props} isOpen={isOpen} onOpenChange={setOpen} />
    </>
  );
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

export const NoResize = Template.bind({});
NoResize.args = {
  interactions: "move",
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  interactions: "none",
};

export const NonDismissable = Template.bind({});
NonDismissable.args = {
  nonDismissable: true,
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

export const OnCustomTrigger = Template.bind(null);
OnCustomTrigger.args = {
  trigger: (
    <Pressable>
      <button>Custom trigger</button>
    </Pressable>
  ),
};
