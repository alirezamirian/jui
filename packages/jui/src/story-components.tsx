import { Selection } from "@react-types/shared";
import React, { HTMLProps, Key } from "react";
import { styled } from "./styled";
import { SpeedSearchTree, TreeRefValue } from "@intellij-platform/core/Tree";
import { staticSpeedSearchTreeItems } from "@intellij-platform/core/Tree/story-helpers";

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
export const SpeedSearchTreeSample = ({
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
    <SpeedSearchTree
      ref={treeRef}
      fillAvailableSpace
      selectionMode="multiple"
      defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={new Set(defaultSelectedKeys)}
      onSelectionChange={onSelectedKeysChange}
    >
      {staticSpeedSearchTreeItems}
    </SpeedSearchTree>
  );
};
