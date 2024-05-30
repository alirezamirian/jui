import React, { RefObject } from "react";
import {
  atom,
  RecoilState,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  ActionDefinition,
  ActionsProvider,
  ActionTooltip,
  DefaultToolWindow,
  MultiViewToolWindow,
  PlatformIcon,
  styled,
  TabCloseButton,
  ThreeViewSplitter,
  ThreeViewSplitterProps,
  TooltipTrigger,
  ToolWindowTabContent,
} from "@intellij-platform/core";

import { VcsLogDetailsView } from "./DetailsView/VcsLogDetailsView";
import { VcsLogCommitsView } from "./CommitsView/VcsLogCommitsView";
import { VcsBranchesView } from "./BranchesView/VcsBranchesView";
import { VcsActionIds } from "../VcsActionIds";
import {
  useCloseVcsTab,
  vcsActiveTabKeyState,
  vcsLogFilter,
  vcsLogTabShowBranchesState,
  vcsLogTabShowCommitDetailsState,
  vcsTabKeysState,
  vcsTabTitleState,
} from "./vcs-logs.state";
import { useCommitsTableActions } from "./CommitsView/useCommitsTableActions";
import { notImplemented } from "../../Project/notImplemented";
import { vcsRootsState } from "../file-status.state";
import { VersionControlToolWindowZeroState } from "./VersionControlToolWindowZeroState";

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
  :focus-visible {
    outline: none;
  }
`;

export const searchInputRefState = atom<RefObject<HTMLInputElement>>({
  key: "vcs/toolWindow/searchInputRef",
  default: React.createRef(),
  dangerouslyAllowMutability: true,
});

export const VersionControlToolWindow = () => {
  const tabKeys = useRecoilValue(vcsTabKeysState);
  const [activeTabKey, setActiveTabKey] = useRecoilState(vcsActiveTabKeyState);
  const repos = useRecoilValue(vcsRootsState);

  return repos.length > 0 ? (
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
  ) : (
    <DefaultToolWindow headerContent="Version Control">
      <VersionControlToolWindowZeroState />
    </DefaultToolWindow>
  );
};

const StyledExpandStripeButton = styled.button.attrs({ tabIndex: -1 })`
  box-sizing: border-box;
  all: unset;
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
    vcsLogTabShowBranchesState(tabKey)
  );

  const firstViewProps: Partial<ThreeViewSplitterProps> = showBranches
    ? {
        firstView: <VcsBranchesView tabKey={tabKey} />,
        firstSize: firstViewSize,
        onFirstResize: setFirstViewSize,
        firstViewMinSize: 85,
      }
    : {};
  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        // tabIndex is added to make the whole container focusable, which means the focus can go away from the currently
        // focused element, when background is clicked. This is to follow the original implementation.
        <StyledContainer
          {...shortcutHandlerProps}
          tabIndex={showBranches ? -1 : 0}
        >
          {!showBranches && (
            <ShowBranchesButton onPress={() => setShowBranches(true)} />
          )}
          <ThreeViewSplitter
            {...firstViewProps}
            innerView={<VcsLogCommitsView tabKey={tabKey} />}
            innerViewMinSize={200}
            lastView={<VcsLogDetailsView tabKey={tabKey} />}
            lastSize={lastViewSize}
            onLastResize={setLastViewSize}
            lastViewMinSize={40}
          />
        </StyledContainer>
      )}
    </ActionsProvider>
  );
}

function useToggleCurrentTabSettings(
  toggleState: (activeTab: string) => RecoilState<boolean>
) {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        set(
          toggleState(snapshot.getLoadable(vcsActiveTabKeyState).getValue()),
          (value) => !value
        );
      },
    []
  );
}

function useVcsLogsToolWindowActions() {
  const textFilterRef = useRecoilValue(searchInputRefState);
  const hideBranches = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        set(
          vcsLogTabShowBranchesState(
            snapshot.getLoadable(vcsActiveTabKeyState).getValue()
          ),
          // Would be nicer to have the action toggle, but prioritized matching the reference impl here.
          false
        );
      },
    []
  );

  const toggleMatchCase = useToggleCurrentTabSettings(vcsLogFilter.matchCase);
  const toggleRegExp = useToggleCurrentTabSettings(vcsLogFilter.regExp);
  const toggleDetails = useToggleCurrentTabSettings(
    vcsLogTabShowCommitDetailsState
  );

  const actions: ActionDefinition[] = [
    ...useCommitsTableActions(),
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
      actionPerformed: toggleMatchCase,
    },
    {
      id: VcsActionIds.REG_EXP,
      title: "Regex",
      icon: <PlatformIcon icon="actions/regex" />,
      actionPerformed: toggleRegExp,
    },
    {
      id: VcsActionIds.SHOW_DETAILS,
      title: "Show Details",
      description: "Display details panel",
      actionPerformed: toggleDetails,
    },
    {
      id: VcsActionIds.SHOW_DIFF_PREVIEW,
      title: "Show Diff Preview",
      description: "Show Diff Preview Panel",
      actionPerformed: () => notImplemented(),
    },
  ];
  return actions;
}

function VcsToolWindowTabTitle({ tabKey }: { tabKey: string }) {
  const closeTab = useCloseVcsTab();
  return (
    <ToolWindowTabContent
      title={useRecoilValue(vcsTabTitleState(tabKey))}
      closeButton={
        tabKey !== "MAIN" && (
          <TooltipTrigger tooltip={<ActionTooltip actionName="Close Tab" />}>
            <TabCloseButton onPress={() => closeTab(tabKey)} />
          </TooltipTrigger>
        )
      }
    />
  );
}
