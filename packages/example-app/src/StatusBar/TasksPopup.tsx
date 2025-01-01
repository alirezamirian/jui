import React from "react";
import styled from "styled-components";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { StyledVerticalSeparator } from "@intellij-platform/core/StyledSeparator";
import {
  IconButton,
  PlatformIcon,
  Popup,
  ProgressBar,
  ProgressBarStopButton,
  Tooltip,
  TooltipTrigger,
} from "@intellij-platform/core";

import { tasksAtom, useCancelTask } from "../tasks";
import {
  showProgressPanelAtom,
  tasksPopupBoundsAtom,
} from "./IdeStatusBar.state";

const StyledPopupTitle = styled.div`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0.625rem;
`;

export function TasksPopup() {
  const setShowProgressPanel = useSetAtom(showProgressPanelAtom);
  const tasks = useAtomValue(tasksAtom);
  const cancel = useCancelTask();
  const [bounds, setBounds] = useAtom(tasksPopupBoundsAtom);

  return (
    <Popup
      bounds={
        // Maybe it would be a nicer UX to not fix height, and let it be based on content, but tried to mimic the
        // original impl, where the height is fixed. The only improvement over the original impl is that the default
        // height (in case of no persisted bounds), would depend on the content, and it will remain based on content,
        // as long as the bounds is not changed manually by the user.
        bounds || {
          width: 300,
          // TODO: allow for positioning based on right and/or bottom
          left: window.innerWidth - 300 - /* distance to right edge */ 150,
          top:
            window.innerHeight -
            tasks.length * 80 - // progress bars
            30 - // header
            100, // distance to bottom edge,
        }
      }
      onBoundsChange={(bounds) => {
        setBounds(bounds);
      }}
      minHeight={100}
      minWidth={300}
      nonDismissable
      interactions="all"
    >
      <Popup.Layout
        header={
          <Popup.Header hasControls>
            <StyledPopupTitle>Background Tasks</StyledPopupTitle>
            <TooltipTrigger tooltip={<Tooltip>Hide</Tooltip>}>
              <IconButton
                preventFocusOnPress
                excludeFromTabOrder
                onPress={() => setShowProgressPanel(false)}
              >
                <PlatformIcon icon="general/hideToolWindow" />
              </IconButton>
            </TooltipTrigger>
          </Popup.Header>
        }
        content={
          <>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <ProgressBar
                  style={{ margin: ".5rem 0.75rem" }}
                  name={task.title}
                  isIndeterminate={task.progress.isIndeterminate}
                  aria-label={`Progress of ${task.title}`}
                  details={
                    task.progress.text ||
                    (task.progress.secondaryText ? <>&nbsp;</> : undefined)
                  }
                  secondaryDetails={task.progress.secondaryText}
                  value={task.progress.fraction}
                  maxValue={1}
                  button={
                    task.isCancelable && (
                      <ProgressBarStopButton onPress={() => cancel(task.id)} />
                    )
                  }
                />
                {tasks[index + 1] && <StyledVerticalSeparator />}
              </React.Fragment>
            ))}
          </>
        }
      />
    </Popup>
  );
}
