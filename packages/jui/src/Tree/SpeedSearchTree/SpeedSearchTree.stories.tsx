import { Meta } from "@storybook/react";
import React, { Key, useState } from "react";
import {
  Pane,
  SelectionLog,
  SpeedSearchTreeSample,
} from "../../story-components";
import { SpeedSearchTree } from "./SpeedSearchTree";

export default {
  title: "Components/Tree (Speed search)",
  Component: SpeedSearchTree,
} as Meta;

export const Static = () => {
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set(["Theme", "index.ts"])
  );
  return (
    <div style={{ display: "flex" }}>
      <Pane>
        <SpeedSearchTreeSample
          selectedKeys={selectedKeys}
          onSelectedKeysChange={setSelectedKeys}
        />
      </Pane>
      <div style={{ marginLeft: 20 }}>
        <h4>Selection</h4>
        <SelectionLog selection={selectedKeys} />
      </div>
    </div>
  );
};
