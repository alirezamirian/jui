import React from "react";
import { useAtom } from "jotai";
import {
  showIgnoredFilesAtom,
  showRelatedFilesAtom,
} from "../ChangesView.state";
import {
  IconButtonWithMenu,
  Item,
  Menu,
  PlatformIcon,
} from "@intellij-platform/core";

export const ViewOptionsActionButton = (): React.ReactElement => {
  const [showRelatedFiles, setShowRelatedFiles] = useAtom(showRelatedFilesAtom);
  const [showIgnoredFiles, setShowIgnoredFiles] = useAtom(showIgnoredFilesAtom);
  const viewOptions = { showRelatedFiles, showIgnoredFiles };

  return (
    <IconButtonWithMenu
      renderMenu={({ menuProps }) => (
        <Menu
          {...menuProps}
          selectedKeys={Object.keys(viewOptions).filter(
            (key) => viewOptions[key as keyof typeof viewOptions]
          )}
          onAction={(key) => {
            switch (key) {
              case "showIgnoredFiles":
                return setShowIgnoredFiles((value) => !value);
              case "showRelatedFiles":
                return setShowRelatedFiles((value) => !value);
            }
          }}
        >
          <Item key="showIgnoredFiles">Show Ignored Files</Item>
          <Item key="showRelatedFiles">
            Show Files Related to Active Changelist
          </Item>
        </Menu>
      )}
    >
      <PlatformIcon icon="actions/show.svg" />
    </IconButtonWithMenu>
  );
};
