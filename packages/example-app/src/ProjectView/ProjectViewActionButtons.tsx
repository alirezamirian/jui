import {
  ActionButton,
  ActionTooltip,
  PlatformIcon,
  TooltipTrigger,
  CommonActionId,
} from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import {
  expandToPathCallback,
  selectKeyAndFocusCallback,
} from "./ProjectView.state";
import { Action } from "@intellij-platform/core/ActionSystem/components";

export const ProjectViewActionButtons = (): React.ReactElement => {
  const activeTab = useRecoilValue(activeEditorTabState);

  const expandToOpenedFile = useRecoilCallback(expandToPathCallback, []);
  const selectKeyAndFocus = useRecoilCallback(selectKeyAndFocusCallback, []);
  const selectOpenedFile = () => {
    if (activeTab) {
      expandToOpenedFile(activeTab.filePath);
      selectKeyAndFocus(activeTab.filePath);
    }
  };

  return (
    <>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Select Opened File" />}
      >
        <ActionButton onPress={selectOpenedFile} isDisabled={!activeTab}>
          <PlatformIcon icon="general/locate" />
        </ActionButton>
      </TooltipTrigger>
      <Action.Button actionId={CommonActionId.EXPAND_ALL} />
      <Action.Button actionId={CommonActionId.COLLAPSE_ALL} />
    </>
  );
};
