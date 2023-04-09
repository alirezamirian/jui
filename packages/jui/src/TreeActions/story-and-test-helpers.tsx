import React, { RefObject } from "react";
// eslint-disable-next-line no-restricted-imports
import {
  ActionsProvider,
  Button,
  CommonActionId,
  TreeRefValue,
  useActionGroup,
  useTreeActions,
} from "@intellij-platform/core";

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
          onPress={() => action?.perform()}
          preventFocusOnPress
        >
          {action?.title} {action.shortcut && <span>({action.shortcut})</span>}
        </Button>
      ))}
    </>
  );
}

export const TreeActionsWrapper = ({
  children,
}: {
  children: (ref: RefObject<TreeRefValue>) => React.ReactNode;
}) => {
  const treeRef = React.useRef<TreeRefValue>(null);
  const treeActions = useTreeActions({ treeRef });
  return (
    <ActionsProvider actions={treeActions}>
      {({ shortcutHandlerProps }) => (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: 8 }}>
            <TreeActionButtons />
          </div>
          <div {...shortcutHandlerProps} style={{ maxWidth: 400 }}>
            {children(treeRef)}
          </div>
        </>
      )}
    </ActionsProvider>
  );
};
