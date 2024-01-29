import React, { RefObject } from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  ActionDefinition,
  ActionsProvider,
  ActionTooltip,
  MultiViewToolWindow,
  PlatformIcon,
  styled,
  TabCloseButton,
  ThreeViewSplitter,
  ThreeViewSplitterProps,
  TooltipTrigger,
  ToolWindowTabContent,
} from "@intellij-platform/core";

import { VcsLogDetailsView } from "./VcsLogDetailsView";
import { VcsLogCommitsView } from "./CommitsView/VcsLogCommitsView";
import { VcsBranchesView } from "./BranchesView/VcsBranchesView";
import { VcsActionIds } from "../VcsActionIds";
import {
  useResetFilters,
  vcsActiveTabKeyState,
  vcsLogFilter,
  vcsLogTabShowBranches,
  vcsTabKeysState,
  vcsTabTitleState,
} from "./vcs-logs.state";

export const VERSION_CONTROL_TOOLWINDOW_ID = "Version Control";

const firstViewSizeState = atom({
  key: "vcs/toolwindow/firstViewSize",
  default: 0.25,
});
const lastViewSizeState = atom({
  key: "vcs/toolwindow/lastViewSize",
  default: 0.35,
});

const StyledToolWindowHeader = styled.span`
  margin: 0 0.5rem 0 0.125rem;
`;

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
`;

export const searchInputRefState = atom<RefObject<HTMLInputElement>>({
  key: "vcs/toolWindow/searchInputRef",
  default: React.createRef(),
  dangerouslyAllowMutability: true,
});

export const VersionControlToolWindow = () => {
  const tabKeys = useRecoilValue(vcsTabKeysState);
  const [activeTabKey, setActiveTabKey] = useRecoilState(vcsActiveTabKeyState);
  return (
    <MultiViewToolWindow
      headerContent={<StyledToolWindowHeader>Git:</StyledToolWindowHeader>}
      activeKey={activeTabKey}
      onActiveKeyChange={(key) => setActiveTabKey(`${key}`)}
    >
      {tabKeys.map((key) => (
        <MultiViewToolWindow.View
          tabContent={<VcsToolWindowTabTitle tabKey={key} />}
          key={key}
        >
          <VcsTab tabKey={key} />
        </MultiViewToolWindow.View>
      ))}
    </MultiViewToolWindow>
  );
};

const StyledExpandStripeButton = styled.button.attrs({ tabIndex: -1 })`
  box-sizing: border-box;
  all: unset;
  height: 100%;
  width: 1.71875rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 0.625rem;
  background: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  :disabled {
    color: ${({ theme }) => theme.color("Button.disabledText")};
  }
  &:hover {
    background: ${({ theme }) =>
      theme.color(
        "ToolWindow.Button.hoverBackground",
        theme.dark ? "#0f0f0f28" : "#55555528"
      )};
  }
`;
const StyledShowBranchesButton = styled(StyledExpandStripeButton)`
  border-right: 1px solid ${({ theme }) => theme.commonColors.borderColor};
`;
const StyledShowBranchesButtonText = styled.span`
  writing-mode: vertical-lr;
  transform: rotateZ(180deg);
  font-size: 0.6875rem;
`;

function ShowBranchesButton({ onPress }: { onPress: () => void }) {
  return (
    <StyledShowBranchesButton onClick={onPress}>
      <PlatformIcon icon="actions/arrowExpand" />
      <StyledShowBranchesButtonText>Branches</StyledShowBranchesButtonText>
    </StyledShowBranchesButton>
  );
}

function VcsTab({ tabKey }: { tabKey: string }) {
  const [firstViewSize, setFirstViewSize] = useRecoilState(firstViewSizeState);
  const [lastViewSize, setLastViewSize] = useRecoilState(lastViewSizeState);

  const actions = useVcsLogsToolWindowActions();
  const [showBranches, setShowBranches] = useRecoilState(
    vcsLogTabShowBranches(tabKey)
  );

  const firstViewProps: Partial<ThreeViewSplitterProps> = showBranches
    ? {
        firstView: <VcsBranchesView />,
        firstSize: firstViewSize,
        onFirstResize: setFirstViewSize,
        firstViewMinSize: 85,
      }
    : {};
  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <StyledContainer {...shortcutHandlerProps}>
          {!showBranches && (
            <ShowBranchesButton onPress={() => setShowBranches(true)} />
          )}
          <ThreeViewSplitter
            {...firstViewProps}
            innerView={<VcsLogCommitsView tabKey={tabKey} />}
            innerViewMinSize={200}
            lastView={<VcsLogDetailsView />}
            lastSize={lastViewSize}
            onLastResize={setLastViewSize}
            lastViewMinSize={40}
          />
        </StyledContainer>
      )}
    </ActionsProvider>
  );
}

function useVcsLogsToolWindowActions() {
  const textFilterRef = useRecoilValue(searchInputRefState);
  const hideBranches = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        set(
          vcsLogTabShowBranches(
            snapshot.getLoadable(vcsActiveTabKeyState).getValue()
          ),
          // Would be nicer to have the action toggle, but prioritized matching the reference impl here.
          false
        );
      },
    []
  );
  const toggleMatchCaseAction = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        set(
          vcsLogFilter.matchCase(
            snapshot.getLoadable(vcsActiveTabKeyState).getValue()
          ),
          (value) => !value
        );
      },
    []
  );

  const toggleRegExpAction = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        set(
          vcsLogFilter.regExp(
            snapshot.getLoadable(vcsActiveTabKeyState).getValue()
          ),
          (value) => !value
        );
      },
    []
  );

  const actions: ActionDefinition[] = [
    {
      id: VcsActionIds.FOCUS_TEXT_FILTER,
      title: "Focus Text Filter",
      actionPerformed: () => {
        textFilterRef.current?.focus();
      },
    },
    {
      id: VcsActionIds.GIT_LOG_HIDE_BRANCHES,
      title: "Hide Git Branches",
      icon: <PlatformIcon icon="actions/arrowCollapse" />,
      actionPerformed: hideBranches,
    },
    {
      id: VcsActionIds.MATCH_CASE,
      title: "Match Case",
      icon: <PlatformIcon icon="actions/matchCase.svg" />,
      actionPerformed: toggleMatchCaseAction,
    },
    {
      id: VcsActionIds.REG_EXP,
      title: "Regex",
      icon: <PlatformIcon icon="actions/regex" />,
      actionPerformed: toggleRegExpAction,
    },
  ];
  return actions;
}

function VcsToolWindowTabTitle({ tabKey }: { tabKey: string }) {
  const resetFilters = useResetFilters();
  const closeTab = useRecoilCallback(
    ({ set, snapshot, reset }) =>
      () => {
        const tabs = snapshot.getLoadable(vcsTabKeysState).getValue();
        const currentActiveTabKey = snapshot
          .getLoadable(vcsActiveTabKeyState)
          .getValue();
        if (currentActiveTabKey === tabKey) {
          // make sure the active tab key remains valid, by switching to previous tab. In the reference implementation
          // the previously activated tab will be activated instead of the previous one index-wise, but it's a
          // negligible and easy-to-fix difference.
          set(
            vcsActiveTabKeyState,
            tabs[tabs.findIndex((key) => key === tabKey) - 1] || tabs[0]
          );
        }
        set(vcsTabKeysState, (keys) => keys.filter((key) => key !== tabKey));
        resetFilters(tabKey);
        reset(vcsLogTabShowBranches(tabKey));
      },
    []
  );
  return (
    <ToolWindowTabContent
      title={useRecoilValue(vcsTabTitleState(tabKey))}
      closeButton={
        tabKey !== "MAIN" && (
          <TooltipTrigger tooltip={<ActionTooltip actionName="Close Tab" />}>
            <TabCloseButton onPress={closeTab} />
          </TooltipTrigger>
        )
      }
    />
  );
}
