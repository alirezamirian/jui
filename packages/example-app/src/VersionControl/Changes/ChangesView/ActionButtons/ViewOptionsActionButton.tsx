import React from "react";
import { useRecoilState } from "recoil";
import {
  showIgnoredFilesState,
  showRelatedFilesState,
} from "../ChangesView.state";
import {
  ActionButtonWithMenu,
  Item,
  Menu,
  PlatformIcon,
} from "@intellij-platform/core";

export const ViewOptionsActionButton = (): React.ReactElement => {
  const [showRelatedFiles, setShowRelatedFiles] = useRecoilState(
    showRelatedFilesState
  );
  const [showIgnoredFiles, setShowIgnoredFiles] = useRecoilState(
    showIgnoredFilesState
  );
  const viewOptions = { showRelatedFiles, showIgnoredFiles };

  return (
    <ActionButtonWithMenu
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
    </ActionButtonWithMenu>
  );
};
