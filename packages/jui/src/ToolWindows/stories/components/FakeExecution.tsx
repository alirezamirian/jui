import React, { useEffect, useState } from "react";
import { Toolbar } from "../../../Toolbar/Toolbar";
import { IconButton } from "../../../IconButton";
import { PlatformIcon } from "../../../Icon";
import { StyledHorizontalSeparator } from "../../../StyledSeparator";
import { styled } from "../../../styled";

interface Execution {
  id: string;
  isRunning: boolean;
  title: string;
}

export function useFakeExecution(scripts: Record<string, string>) {
  const [executions, setExecutions] = useState<Array<Execution>>([]);

  useEffect(() => {
    addExecution(true);
    addExecution();
  }, []);

  const addExecution = (run = false, scriptName?: string) => {
    const scriptNames = Object.keys(scripts);
    return setExecutions((executions) => {
      const title =
        scriptName ||
        scriptNames.find((name) =>
          executions.every(({ title }) => title !== name)
        ) ||
        scriptNames[0];
      return executions.concat({
        id: `${Math.max(...executions.map(({ id }) => parseInt(id)), 0) + 1}`,
        isRunning: run,
        title,
      });
    });
  };
  const runScript = (name: string) => {
    const execution = executions.find((process) => process.title === name);
    if (execution) {
      if (!execution.isRunning) {
        toggle(execution.id);
      }
    } else {
      addExecution(true, name);
    }
  };
  const toggle = (executionId: string) => {
    setExecutions((executions) =>
      executions.map((execution) =>
        execution.id === executionId
          ? {
              ...execution,
              isRunning: !execution.isRunning,
            }
          : execution
      )
    );
  };

  const close = (executionId: string) => {
    setExecutions((executions) => {
      return executions.filter(({ id }) => executionId !== id);
    });
  };

  return { executions, runScript, toggle, close };
}

export const FakeExecutionToolbar = ({
  execution: { isRunning, id },
  toggle,
}: {
  execution: Execution;
  toggle: (executionId: string) => void;
}) => (
  <Toolbar hasBorder>
    <IconButton onPress={() => toggle(id)}>
      <PlatformIcon icon={isRunning ? "actions/restart" : "actions/execute"} />
    </IconButton>
    <IconButton isDisabled={!isRunning} onPress={() => toggle(id)}>
      <PlatformIcon icon="actions/suspend" />
    </IconButton>
    <StyledHorizontalSeparator />
    <IconButton isDisabled>
      <PlatformIcon icon="runConfigurations/scroll_down" />
    </IconButton>
    <IconButton>
      <PlatformIcon icon="actions/gc" />
    </IconButton>
  </Toolbar>
);

export const VerticalFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const RunConsoleOutput = styled.div`
  background: ${({ theme }) => (theme.dark ? "#2b2b2b" : "#fff")}; // FIXME
  flex: 1;
`;
