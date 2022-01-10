import { Item } from "@react-stately/collections";
import { Selection } from "@react-types/shared";
import React, { HTMLProps, Key } from "react";
import { styled } from "./styled";
import { SpeedSearchTree } from "./Tree/SpeedSearchTree/SpeedSearchTree";
import { HighlightedTextValue } from "@intellij-platform/core/CollectionSpeedSearch";

export const Container = styled.div`
  color: ${({ theme }) => theme.color("*.foreground")};
`;
export const Pane: React.FC<Omit<HTMLProps<HTMLDivElement>, "style">> = (
  props
) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: 400,
      marginTop: 25,
      height: "calc(100vh - 70px)",
    }}
    {...props}
  />
);

export function SelectionLog({ selection }: { selection: Selection }) {
  return (
    <pre>
      {selection instanceof Set && (
        <div>{JSON.stringify([...selection], null, 2)}</div>
      )}
      {JSON.stringify(selection, null, 2)}
    </pre>
  );
}

type SelectedKeysType = "all" | Set<Key>;
export const SpeedSearchTreeSample = ({
  selectedKeys,
  defaultSelectedKeys = new Set(["BasicList"]),
  onSelectedKeysChange,
}: {
  selectedKeys?: SelectedKeysType;
  defaultSelectedKeys?: SelectedKeysType;
  onSelectedKeysChange?: (selectedKeys: SelectedKeysType) => void;
}): React.ReactElement => {
  return (
    <SpeedSearchTree
      fillAvailableSpace
      selectionMode="multiple"
      defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      onSelectionChange={onSelectedKeysChange}
    >
      <Item key="index.ts">index.ts</Item>
      <Item textValue="List" title={<HighlightedTextValue />} key="List">
        <Item
          textValue="BasicList"
          title={<HighlightedTextValue />}
          key="BasicList"
        >
          <Item textValue="BasicList.stories.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="BasicList.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="BasicListItem.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="useBasicList.ts">
            <HighlightedTextValue />
          </Item>
        </Item>

        <Item
          textValue="SpeedSearchList"
          title={<HighlightedTextValue />}
          key="SpeedSearchList"
        >
          <Item textValue="SpeedSearchList.stories.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="SpeedSearchList.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="SpeedSearchListItem.tsx">
            <HighlightedTextValue />
          </Item>
          <Item textValue="useSpeedSearchList.ts">
            <HighlightedTextValue />
          </Item>
        </Item>

        <Item textValue="ListDivider.tsx">
          <HighlightedTextValue />
        </Item>
      </Item>
      <Item textValue="Theme" title={<HighlightedTextValue />} key="Theme">
        <Item textValue="createTheme.ts">
          <HighlightedTextValue />
        </Item>
      </Item>
    </SpeedSearchTree>
  );
};
