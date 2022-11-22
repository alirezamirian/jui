import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Button,
  CommonActionId,
  TreeRefValue,
  useActionGroup,
  ActionsProvider,
  useTreeActions,
} from "@intellij-platform/core";
import { SpeedSearchTreeSample, TreeSample } from "../story-components";

export default {
  title: "Components/TreeActions",
} as Meta;

function TreeActionButtons() {
  const actions = useActionGroup([
    CommonActionId.EXPAND_ALL,
    CommonActionId.COLLAPSE_ALL,
    CommonActionId.EXPAND_SELECTION,
    CommonActionId.SHRINK_SELECTION,
  ]);

  return (
    <>
      {actions.map((action) => (
        <Button
          key={action.id}
          onPress={action?.actionPerformed}
          preventFocusOnPress
        >
          {action?.title} {action.shortcut && <span>({action.shortcut})</span>}
        </Button>
      ))}
    </>
  );
}
const createStoryOn =
  (TreeComponent: typeof SpeedSearchTreeSample): Story =>
  () => {
    const treeRef = React.useRef<TreeRefValue>(null);
    const treeActions = useTreeActions({ treeRef });
    return (
      <ActionsProvider actions={treeActions}>
        {({ shortcutHandlerProps }) => (
          <>
            <div
              style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: 8 }}
            >
              <TreeActionButtons />
            </div>
            <div {...shortcutHandlerProps} style={{ maxWidth: 400 }}>
              <TreeComponent treeRef={treeRef} defaultSelectedKeys={[]} />
            </div>
          </>
        )}
      </ActionsProvider>
    );
  };

export const OnTree = createStoryOn(TreeSample);
export const OnSpeedSearchTree = createStoryOn(SpeedSearchTreeSample);
