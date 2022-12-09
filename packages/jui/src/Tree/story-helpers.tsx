import React from "react";
import { CollectionElement } from "@react-types/shared";
import { Item } from "@react-stately/collections";

import { HighlightedTextValue } from "../CollectionSpeedSearch";

type TreeItem = {
  name: string;
  children?: TreeItem[];
};
export const treeItems: TreeItem[] = [
  { name: "index.ts" },
  {
    name: "List",
    children: [
      {
        name: "BasicList",
        children: [
          { name: "BasicList.stories.tsx" },
          { name: "BasicList.tsx" },
          { name: "BasicListItem.tsx" },
          { name: "useBasicList.ts" },
        ],
      },
      {
        name: "SpeedSearchList",
        children: [
          { name: "SpeedSearchList.stories.tsx" },
          { name: "SpeedSearchList.tsx" },
          { name: "SpeedSearchListItem.tsx" },
          { name: "useSpeedSearchList.ts" },
        ],
      },
      { name: "ListDivider.tsx" },
    ],
  },
  { name: "Theme", children: [{ name: "createTheme.ts" }] },
];

export const staticTreeItems: Array<CollectionElement<any>> = (
  <>
    <Item key="index.ts" textValue="index.ts">
      index.ts
    </Item>
    <Item textValue="List" title="List" key="List">
      <Item textValue="BasicList" title="BasicList" key="BasicList">
        <Item textValue="BasicList.stories.tsx">BasicList.stories.tsx</Item>
        <Item textValue="BasicList.tsx">BasicList.tsx</Item>
        <Item textValue="BasicListItem.tsx">BasicListItem.tsx</Item>
        <Item textValue="useBasicList.ts">useBasicList.ts</Item>
      </Item>

      <Item
        textValue="SpeedSearchList"
        title="SpeedSearchList"
        key="SpeedSearchList"
      >
        <Item textValue="SpeedSearchList.stories.tsx">
          SpeedSearchList.stories.tsx
        </Item>
        <Item textValue="SpeedSearchList.tsx">SpeedSearchList.tsx</Item>
        <Item textValue="SpeedSearchListItem.tsx">SpeedSearchListItem.tsx</Item>
        <Item textValue="useSpeedSearchList.ts">useSpeedSearchList.ts</Item>
      </Item>

      <Item textValue="ListDivider.tsx">ListDivider.tsx</Item>
    </Item>
    <Item textValue="Theme" title="Theme" key="Theme">
      <Item textValue="createTheme.ts">createTheme.ts</Item>
    </Item>
  </>
).props.children;
export const staticSpeedSearchTreeItems: Array<CollectionElement<any>> = (
  <>
    <Item key="index.ts" textValue="index.ts">
      {<HighlightedTextValue />}
    </Item>
    <Item textValue="List" title={<HighlightedTextValue />} key="List">
      <Item
        textValue="BasicList"
        title={<HighlightedTextValue />}
        key="BasicList"
      >
        <Item textValue="BasicList.stories.tsx">
          {<HighlightedTextValue />}
        </Item>
        <Item textValue="BasicList.tsx">{<HighlightedTextValue />}</Item>
        <Item textValue="BasicListItem.tsx">{<HighlightedTextValue />}</Item>
        <Item textValue="useBasicList.ts">{<HighlightedTextValue />}</Item>
      </Item>

      <Item
        textValue="SpeedSearchList"
        title={<HighlightedTextValue />}
        key="SpeedSearchList"
      >
        <Item textValue="SpeedSearchList.stories.tsx">
          {<HighlightedTextValue />}
        </Item>
        <Item textValue="SpeedSearchList.tsx">{<HighlightedTextValue />}</Item>
        <Item textValue="SpeedSearchListItem.tsx">
          {<HighlightedTextValue />}
        </Item>
        <Item textValue="useSpeedSearchList.ts">
          {<HighlightedTextValue />}
        </Item>
      </Item>

      <Item textValue="ListDivider.tsx">{<HighlightedTextValue />}</Item>
    </Item>
    <Item textValue="Theme" title={<HighlightedTextValue />} key="Theme">
      <Item textValue="createTheme.ts">{<HighlightedTextValue />}</Item>
    </Item>
  </>
).props.children;
