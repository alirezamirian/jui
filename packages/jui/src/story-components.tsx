import { Item } from "@react-stately/collections";
import { Selection } from "@react-types/shared";
import React, { HTMLProps, Key } from "react";
import { styled } from "./styled";
import { SpeedSearchTree } from "./Tree/SpeedSearchTree/SpeedSearchTree";
import { HighlightedTextValue } from "@intellij-platform/core/CollectionSpeedSearch";
import { Tree, TreeRefValue } from "@intellij-platform/core/Tree";

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

type SelectedKeysType = "all" | Iterable<Key>;
const createTreeSample =
  (
    TreeComponent: typeof Tree,
    itemContent = (value: string): React.ReactNode => value
  ) =>
  ({
    selectedKeys,
    defaultSelectedKeys = ["BasicList"],
    onSelectedKeysChange,
    treeRef,
  }: {
    selectedKeys?: SelectedKeysType;
    defaultSelectedKeys?: SelectedKeysType;
    onSelectedKeysChange?: (selectedKeys: Selection) => void;
    treeRef?: React.RefObject<TreeRefValue>;
  }): React.ReactElement => {
    return (
      <TreeComponent
        ref={treeRef}
        fillAvailableSpace
        selectionMode="multiple"
        defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={new Set(defaultSelectedKeys)}
        onSelectionChange={onSelectedKeysChange}
      >
        <Item key="index.ts" textValue="index.ts">
          {itemContent("index.ts")}
        </Item>
        <Item textValue="List" title={itemContent("List")} key="List">
          <Item
            textValue="BasicList"
            title={itemContent("BasicList")}
            key="BasicList"
          >
            <Item textValue="BasicList.stories.tsx">
              {itemContent("BasicList.stories.tsx")}
            </Item>
            <Item textValue="BasicList.tsx">
              {itemContent("BasicList.tsx")}
            </Item>
            <Item textValue="BasicListItem.tsx">
              {itemContent("BasicListItem.tsx")}
            </Item>
            <Item textValue="useBasicList.ts">
              {itemContent("useBasicList.ts")}
            </Item>
          </Item>

          <Item
            textValue="SpeedSearchList"
            title={itemContent("SpeedSearchList")}
            key="SpeedSearchList"
          >
            <Item textValue="SpeedSearchList.stories.tsx">
              {itemContent("SpeedSearchList.stories.tsx")}
            </Item>
            <Item textValue="SpeedSearchList.tsx">
              {itemContent("SpeedSearchList.tsx")}
            </Item>
            <Item textValue="SpeedSearchListItem.tsx">
              {itemContent("SpeedSearchListItem.tsx")}
            </Item>
            <Item textValue="useSpeedSearchList.ts">
              {itemContent("useSpeedSearchList.ts")}
            </Item>
          </Item>

          <Item textValue="ListDivider.tsx">
            {itemContent("ListDivider.tsx")}
          </Item>
        </Item>
        <Item textValue="Theme" title={itemContent("Theme")} key="Theme">
          <Item textValue="createTheme.ts">
            {itemContent("createTheme.ts")}
          </Item>
        </Item>
      </TreeComponent>
    );
  };

export const TreeSample = createTreeSample(Tree);
export const SpeedSearchTreeSample = createTreeSample(SpeedSearchTree, () => (
  <HighlightedTextValue />
));
