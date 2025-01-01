import React, { RefObject } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
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
  vcsActiveTabKeyAtom,
  vcsLogFilter,
  vcsLogTabShowBranchesAtoms,
  vcsLogTabShowCommitDetailsAtoms,
  vcsTabKeysAtom,
  vcsTabTitleAtoms,
} from "./vcs-logs.state";
import { useCommitsTableActions } from "./CommitsView/useCommitsTableActions";
import { notImplemented } from "../../Project/notImplemented";
import { vcsRootsAtom } from "../file-status.state";
import { VersionControlToolWindowZeroState } from "./VersionControlToolWindowZeroState";
import { actionAtom } from "../../actionAtom";

export const VERSION_CONTROL_TOOLWINDOW_ID = "Version Control";

const firstViewSizeState = atom(0.25);
const lastViewSizeState = atom(0.35);

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

export const searchInputRefAtom = atom<RefObject<HTMLInputElement>>(
  React.createRef<HTMLInputElement>()
);

export const VersionControlToolWindow = () => {
  const tabKeys = useAtomValue(vcsTabKeysAtom);
  const [activeTabKey, setActiveTabKey] = useAtom(vcsActiveTabKeyAtom);
  const repos = useAtomValue(vcsRootsAtom);

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
  const [firstViewSize, setFirstViewSize] = useAtom(firstViewSizeState);
  const [lastViewSize, setLastViewSize] = useAtom(lastViewSizeState);

  const actions = useVcsLogsToolWindowActions();
  const [showBranches, setShowBranches] = useAtom(
    vcsLogTabShowBranchesAtoms(tabKey)
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

const toggleMatchCaseAction = actionAtom({
  id: VcsActionIds.MATCH_CASE,
  title: "Match Case",
  icon: <PlatformIcon icon="actions/matchCase.svg" />,
  actionPerformed: ({ get, set }) => {
    set(vcsLogFilter.matchCase(get(vcsActiveTabKeyAtom)), (value) => !value);
  },
});

const hideBranchesAction = actionAtom({
  id: VcsActionIds.GIT_LOG_HIDE_BRANCHES,
  title: "Hide Git Branches",
  icon: <PlatformIcon icon="actions/arrowCollapse" />,
  actionPerformed: ({ get, set }) => {
    set(
      vcsLogTabShowBranchesAtoms(get(vcsActiveTabKeyAtom)),
      // Would be nicer to have the action toggle, but prioritized matching the reference impl here.
      false
    );
  },
});

const toggleRegExpAction = actionAtom({
  id: VcsActionIds.REG_EXP,
  title: "Regex",
  icon: <PlatformIcon icon="actions/regex" />,
  actionPerformed: ({ get, set }) => {
    set(vcsLogFilter.regExp(get(vcsActiveTabKeyAtom)), (value) => !value);
  },
});

const toggleDetailsAction = actionAtom({
  id: VcsActionIds.SHOW_DETAILS,
  title: "Show Details",
  description: "Display details panel",
  actionPerformed: ({ get, set }) => {
    set(
      vcsLogTabShowCommitDetailsAtoms(get(vcsActiveTabKeyAtom)),
      (value) => !value
    );
  },
});

const focusTextFilterAction = actionAtom({
  id: VcsActionIds.FOCUS_TEXT_FILTER,
  title: "Focus Text Filter",
  actionPerformed: ({ get }) => {
    get(searchInputRefAtom).current?.focus();
  },
});

const showDiffPreviewAction = {
  id: VcsActionIds.SHOW_DIFF_PREVIEW,
  title: "Show Diff Preview",
  description: "Show Diff Preview Panel",
  actionPerformed: () => notImplemented(),
};

function useVcsLogsToolWindowActions() {
  const actions: ActionDefinition[] = [
    ...useCommitsTableActions(),
    useAtomValue(focusTextFilterAction),
    useAtomValue(hideBranchesAction),
    useAtomValue(toggleMatchCaseAction),
    useAtomValue(toggleRegExpAction),
    useAtomValue(toggleDetailsAction),
    showDiffPreviewAction,
  ];
  return actions;
}

function VcsToolWindowTabTitle({ tabKey }: { tabKey: string }) {
  const closeTab = useCloseVcsTab();
  return (
    <ToolWindowTabContent
      title={useAtomValue(vcsTabTitleAtoms(tabKey))}
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
