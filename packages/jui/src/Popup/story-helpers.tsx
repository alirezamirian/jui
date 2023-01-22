import React from "react";
import {
  Divider,
  Item,
  List,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  Section,
} from "@intellij-platform/core";
import { SpeedSearchTreeSample } from "@intellij-platform/core/story-components";

import { Popup } from ".";

export const menuPopupContent = (
  <Popup.Layout
    header={<Popup.Header>Title</Popup.Header>}
    content={
      <Menu autoFocus>
        <Item textValue="File">
          <MenuItemLayout
            icon={<PlatformIcon icon={"fileTypes/text"} />}
            content="File"
          />
        </Item>
        <Item textValue="Scratch File">
          <MenuItemLayout
            icon={<PlatformIcon icon={"fileTypes/text"} />}
            content="Scratch File"
            shortcut={"⇧⌘N"}
          />
        </Item>
        <Item textValue="Directory">
          <MenuItemLayout
            icon={<PlatformIcon icon={"nodes/folder"} />}
            content="Directory"
          />
        </Item>
        <Divider />
        <Item textValue="HTML File">
          <MenuItemLayout
            icon={<PlatformIcon icon={"fileTypes/html"} />}
            content="HTML File"
          />
        </Item>
        <Item textValue="Stylesheet">
          <MenuItemLayout
            icon={<PlatformIcon icon={"fileTypes/css"} />}
            content="Stylesheet"
          />
        </Item>
        <Item textValue="Javascript">
          <MenuItemLayout
            icon={<PlatformIcon icon={"fileTypes/javaScript"} />}
            content="Javascript"
          />
        </Item>
        <Item
          title={
            <MenuItemLayout
              content=".ignore File"
              icon={<PlatformIcon icon={"fileTypes/text"} />}
            />
          }
        >
          <Item>.gitignore File (Git)</Item>
          <Item>.bzrignore File (Bazaar)</Item>
          <Item>.npmignore File (Npm)</Item>
        </Item>
      </Menu>
    }
  />
);
export const treePopupContent = (
  <Popup.Layout
    header={<Popup.Header>Title</Popup.Header>}
    content={<SpeedSearchTreeSample />}
  />
);
export const listPopupContent = (
  <Popup.Layout
    header={<Popup.Header>Title</Popup.Header>}
    content={
      <List autoFocus selectionMode="multiple" fillAvailableSpace>
        <Item>Paco de lucia</Item>
        <Divider />
        <Item>Vicente Amigo</Item>
        <Section title="Other">
          <Item>Gerardo Nunez</Item>
          <Item>El Amir</Item>
          <Item>El Amir</Item>
        </Section>
      </List>
    }
  />
);
