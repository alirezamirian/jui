import styled from "styled-components";
import {
  BareButton,
  Link,
  ProgressBar,
  ProgressBarProps,
  ProgressBarStopButton,
  Tooltip,
  TooltipTrigger,
} from "@intellij-platform/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { firstTaskState, taskCountState, useCancelTask } from "../tasks";
import { showProgressPanelState } from "./IdeStatusBar.state";
import React, { useEffect } from "react";
import { TasksPopup } from "./TasksPopup";

function StatusBarProgress(
  props: Omit<ProgressBarProps, "dense" | "namePosition" | "width">
) {
  return <ProgressBar dense namePosition="side" width={146} {...props} />;
}

const Spacer = styled.span`
  width: 0.5rem;
`;
const StyledProgressBarButton = styled.span`
  cursor: pointer;

  ${ProgressBar.Container} {
    cursor: unset;
  }
`;
/**
 * Intentionally, "processes" haven't been abstracted as an extension point for different features, since the focus
 * here is not to create an IDE, but to demo UI components.
 */
export const StatusBarTaskProgressBar = () => {
  const firstTask = useRecoilValue(firstTaskState);
  const tasksCount = useRecoilValue(taskCountState);
  const cancel = useCancelTask();
  const [showProgressPanel, setShowProgressPanel] = useRecoilState(
    showProgressPanelState
  );

  // When there is no tasks, switch back to not showing the panel.
  useEffect(() => {
    if (tasksCount === 0) {
      setShowProgressPanel(false);
    }
  }, [tasksCount]);

  return (
    <>
      {firstTask && !showProgressPanel && (
        <TooltipTrigger
          tooltip={
            <Tooltip>{`${firstTask.title}. Click to see all running background tasks.`}</Tooltip>
          }
        >
          <BareButton
            preventFocusOnPress
            excludeFromTabOrder
            onPress={() => {
              setShowProgressPanel(true);
            }}
          >
            <StyledProgressBarButton>
              <StatusBarProgress
                name={firstTask.progress.text || firstTask.title}
                isIndeterminate={firstTask.progress.isIndeterminate}
                value={firstTask.progress.fraction}
                maxValue={1}
                button={
                  <>
                    {/*  {task.canPause && (
                      <ProgressBarPauseButton
                        small
                        paused={false}
                        onPausedChange={() => {}}
                      />
                    )}*/}
                    {firstTask.isCancelable && (
                      <TooltipTrigger tooltip={<Tooltip>Cancel</Tooltip>}>
                        <ProgressBarStopButton
                          small
                          onPress={() => cancel(firstTask.id)}
                        />
                      </TooltipTrigger>
                    )}
                  </>
                }
              />
            </StyledProgressBarButton>
          </BareButton>
        </TooltipTrigger>
      )}
      {(tasksCount > 1 || showProgressPanel) && (
        <>
          <Spacer />
          <Link
            onPress={() =>
              setShowProgressPanel((currentValue) => !currentValue)
            }
          >
            {showProgressPanel ? "Hide processes" : "Show all"} ({tasksCount})
          </Link>
        </>
      )}
      {showProgressPanel && tasksCount > 0 && <TasksPopup />}
    </>
  );
};
