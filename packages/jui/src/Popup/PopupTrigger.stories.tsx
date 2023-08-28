import React, { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
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

export const Default: StoryObj<PopupTriggerProps> = {};

export const Positioning: StoryObj<PopupTriggerProps> = {
  render: ({ children, ...props }) => {
    const [triggerPosition, setTriggerPosition] = useState({
      left: 16,
      top: 16,
    });

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
  },
};

export const PlacementTop: StoryObj<PopupTriggerProps> = {
  args: {
    placement: "top",
  },
  decorators: [
    (TheStory) => (
      <div style={{ marginTop: 50 }}>
        <TheStory />
      </div>
    ),
  ],
};

export const DefaultOpen: StoryObj<PopupTriggerProps> = {
  args: {
    defaultOpen: true,
  },
};

export const ControlledOpen: StoryObj<PopupTriggerProps> = {
  render: (props) => {
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
  },
};

export const DefaultSize: StoryObj<PopupTriggerProps> = {
  args: {
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
  },
};

export const DefaultPosition: StoryObj<PopupTriggerProps> = {
  args: {
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
  },
};

export const NoResize = {
  args: {
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
  },
};

export const NoInteraction = {
  args: {
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
  },
};

export const NonDismissable = {
  args: {
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
  },
};

export const ListContent: StoryObj<PopupTriggerProps> = {
  args: {
    popup: <Popup>{listPopupContent}</Popup>,
  },
};

export const TreeContent: StoryObj<PopupTriggerProps> = {
  args: {
    popup: <Popup>{treePopupContent}</Popup>,
  },
};

export const MenuContent: StoryObj<PopupTriggerProps> = {
  args: {
    popup: ({ close }) => (
      <Popup interactions="none">
        <MenuPopupContent menuProps={{ onClose: close, onAction: alert }} />
      </Popup>
    ),
  },
};

export const OnCustomTrigger: StoryObj<PopupTriggerProps> = {
  args: {
    children: (
      <Pressable>
        <button>Custom trigger</button>
      </Pressable>
    ),
  },
};
