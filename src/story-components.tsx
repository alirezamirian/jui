import { Item } from "@react-stately/collections";
import { useControlledState } from "@react-stately/utils";
import { Selection } from "@react-types/shared";
import React, { Key } from "react";
import { SpeedSearchTree } from "./Tree/SpeedSearchTree/SpeedSearchTree";

export function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        marginTop: 20,
        height: "calc(100vh - 70px)",
      }}
    >
      {children}
    </div>
  );
}

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
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys,
  onSelectedKeysChange,
}: {
  selectedKeys?: SelectedKeysType;
  defaultSelectedKeys?: SelectedKeysType;
  onSelectedKeysChange?: (selectedKeys: SelectedKeysType) => void;
}): React.ReactElement => {
  const [selectedKeys, setSelectedKeys] = useControlledState<SelectedKeysType>(
    selectedKeysProp!,
    defaultSelectedKeys!,
    onSelectedKeysChange!
  );

  return (
    <SpeedSearchTree
      fillAvailableSpace
      selectionMode="multiple"
      defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <Item key="index.ts">index.ts</Item>
      <Item title="List" key="List">
        <Item title="BasicList" key="BasicList">
          <Item>BasicList.stories.tsx</Item>
          <Item>BasicList.tsx</Item>
          <Item>BasicListItem.tsx</Item>
          <Item>useBasicList.ts</Item>
        </Item>

        <Item title="SpeedSearchList" key="SpeedSearchList">
          <Item>SpeedSearchList.stories.tsx</Item>
          <Item>SpeedSearchList.tsx</Item>
          <Item>SpeedSearchListItem.tsx</Item>
          <Item>useSpeedSearchList.ts</Item>
        </Item>

        <Item>ListDivider.tsx</Item>
      </Item>
      <Item title="Theme" key="Theme">
        <Item>createTheme.ts</Item>
      </Item>
    </SpeedSearchTree>
  );
};
