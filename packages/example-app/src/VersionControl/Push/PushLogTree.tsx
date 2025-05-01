import {
  ActionGroupDefinition,
  ActionGroupMenu,
  ActionsProvider,
  ContextMenuContainer,
  Divider,
  Item,
  ItemLayout,
  ItemStateContext,
  Link,
  Menu,
  MenuTrigger,
  MenuTriggerProps,
  PlatformIcon,
  SpeedSearchTree,
  styled,
  Tooltip,
  TooltipTrigger,
  TreeNodeCheckbox,
  useActionGroup,
} from "@intellij-platform/core";
import { atom, Getter, Setter, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { prop } from "ramda";
import React, { Key, useContext, useState } from "react";
import { type CollectionElement } from "@react-types/shared";

import { unwrapLatestOrNull } from "../../atom-utils/unwrapLatest";
import { notImplemented } from "../../Project/notImplemented";
import { actionAtom } from "../../actionAtom";
import { repoRemotesAtoms } from "../Branches/branches.state";
import { getShortRepositoryName } from "../repo-utils";
import {
  formatCommitDate,
  formatCommitTime,
  parseCommitMessage,
  shortenOid,
} from "../commit-utils";
import { VcsActionIds } from "../VcsActionIds";
import { createCopyRevisionNumberActionAtom } from "../VersionControlToolWindow/vcsLogActions";
import { newBranchActionAtom } from "../actions/newBranchAction";
import {
  AnyPushTreeNode,
  getRepoFromKey,
  pushLogSelectedCommitsAtom,
  pushLogTreeSelectionAtom,
  pushTargetBranchAtom,
  pushTargetRemoteAtom,
  type PushTreeCommitNode,
  pushTreeIncludedReposAtom,
  pushTreeNodesAtom,
  type PushTreeRepoNode,
} from "./PushLog.state";
import { useAddRemote } from "./AddRemoteWindow";

const StyledBadge = styled.span`
  color: ${({ theme }) =>
    theme.currentForegroundAware(theme.dark ? "#6ba65d" : "#00b53d")};
  position: relative;
  z-index: 0;
  background: transparent;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: -1;
    background: currentColor;
    opacity: 0.15;
    @container style(--jui-foreground) {
      background: var(--jui-foreground);
      opacity: ${({ theme }) => (theme.dark ? 0.3 : 0.2)};
    }
  }
  line-height: 1;
  padding: 1px 2px;
  font-size: 0.77em;
  border-radius: 0.125rem;
`;

const StyledItemLayout = styled(ItemLayout)<{ $included?: boolean }>`
  opacity: ${({ $included }) => !$included && 0.85};
`;

const toggleSelectionCallback = async (
  get: Getter,
  set: Setter,
  value: string
) => {
  const repo = value.split(":").slice(-1)[0];
  const includedRepos = get(pushTreeIncludedReposAtom);
  if (includedRepos.includes(repo)) {
    set(
      pushTreeIncludedReposAtom,
      includedRepos.filter((key) => key !== repo)
    );
  } else {
    set(pushTreeIncludedReposAtom, includedRepos.concat(repo));
  }
};

const syncPushLogSelectedCommitsAtom = unwrapLatestOrNull(
  pushLogSelectedCommitsAtom
);
const createPatchActionAtom = actionAtom({
  id: VcsActionIds.CREATE_PATCH_FROM_CHANGES,
  title: "Create Patch...",
  description: "Create a patch from the selected changes",
  isDisabled: atom(
    (get) => [...(get(syncPushLogSelectedCommitsAtom) ?? [])].length === 0
  ),
  icon: <PlatformIcon icon="vcs/patch.svg" />,
  actionPerformed: () => {
    notImplemented();
  },
});

const compareWithLocal = actionAtom({
  id: VcsActionIds.COMPARE_WITH_LOCAL,
  title: "Compare with Local",
  description: "Compare version in selected revision with current version",
  isDisabled: atom(
    (get) => [...(get(syncPushLogSelectedCommitsAtom) ?? [])].length === 0
  ),
  actionPerformed: () => {
    notImplemented();
  },
});

const StyledContextMenuContainer = styled(ContextMenuContainer)`
  box-sizing: border-box;
  height: 100%;
  padding-top: 0.5rem;
`;

const copyRevisionNumbersActionAtom = createCopyRevisionNumberActionAtom(
  atom(async (get) =>
    (await get(pushLogSelectedCommitsAtom)).map(({ oid }) => oid)
  )
);

export function PushLogTree() {
  const repoNodes: ReadonlyArray<AnyPushTreeNode> =
    useAtomValue(pushTreeNodesAtom);
  const toggleIncludedRepos = useAtomCallback(toggleSelectionCallback);

  const [selection, setSelection] = useAtom(pushLogTreeSelectionAtom);

  const contextMenuActionGroup: ActionGroupDefinition = {
    // TODO: maybe a helper to create action groups like this that are not supposed to be directly invokable?
    id: VcsActionIds.VCS_LOG_CONTEXT_MENU,
    title: "",
    isSearchable: false,
    children: [
      useAtomValue(copyRevisionNumbersActionAtom),
      useAtomValue(createPatchActionAtom),
      "divider",
      useAtomValue(compareWithLocal),
      "divider",
      useAtomValue(newBranchActionAtom),
    ],
    actionPerformed: () => {},
  };
  return (
    <>
      <ActionsProvider actions={[contextMenuActionGroup]}>
        {({ shortcutHandlerProps }) => (
          <StyledContextMenuContainer
            renderMenu={() => <PushLogContextMenu />}
            {...shortcutHandlerProps}
          >
            {/* NOTE: SpeedSearchTreeWithCheckboxes is not a fit here, considering nested selection is irrelevant here */}
            <SpeedSearchTree
              fillAvailableSpace
              items={repoNodes}
              selectionMode="multiple"
              selectedKeys={selection}
              onSelectionChange={setSelection}
              defaultExpandedKeys={repoNodes.map(prop("key"))}
              onNodeKeyDown={(e, node) => {
                if (e.key === " " && node.value) {
                  toggleIncludedRepos(
                    node.value.type === "repo"
                      ? node.value.repo.dir
                      : node.value.commit.repoPath
                  );
                }
              }}
            >
              {(node) => {
                switch (node.type) {
                  case "repo":
                    return (
                      <Item
                        key={node.key}
                        childItems={node.children}
                        /* TODO: add aria-label */
                        textValue={node.repo.dir}
                      >
                        <PushTreeRepoNode
                          node={node}
                          hasCheckbox={repoNodes.length > 1}
                        />
                      </Item>
                    );
                  case "commit":
                    return (
                      <Item key={node.key}>
                        <PushTreeCommitNode node={node} />
                      </Item>
                    );
                }
              }}
            </SpeedSearchTree>
          </StyledContextMenuContainer>
        )}
      </ActionsProvider>
    </>
  );
}

function PushLogContextMenu() {
  const actionGroup = useActionGroup(VcsActionIds.VCS_LOG_CONTEXT_MENU);
  return actionGroup && <ActionGroupMenu actionGroup={actionGroup} />;
}

const StyledHint = styled.div`
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  font-style: italic;
  margin-top: 1.25rem;
`;

function PushTreeCommitNode({ node }: { node: PushTreeCommitNode }) {
  const { oid, commit } = node.commit.readCommitResult;
  const { subject, body } = parseCommitMessage(
    node.commit.readCommitResult.commit.message
  );

  const opacity = usePushTreeNodeOpacity(node.key);

  return (
    <TooltipTrigger
      tooltip={
        <Tooltip>
          {shortenOid(oid)} {formatCommitDate(commit.committer.timestamp)},{" "}
          {formatCommitTime(commit.committer.timestamp)} by{" "}
          {commit.committer.name} {subject}
          {body}
          <StyledHint>Select to show commit details</StyledHint>
        </Tooltip>
      }
    >
      {(props) => {
        return (
          <StyledItemLayout
            {...props}
            style={{ paddingLeft: ".5rem", opacity }}
          >
            {subject}
          </StyledItemLayout>
        );
      }}
    </TooltipTrigger>
  );
}

function usePushTreeNodeOpacity(key: Key): number | undefined {
  const itemContext = useContext(ItemStateContext);
  const included = useAtomValue(pushTreeIncludedReposAtom).includes(
    getRepoFromKey(key)
  );
  if (
    included ||
    (itemContext?.isSelected && itemContext?.isContainerFocused)
  ) {
    return undefined;
  }
  return NOT_INCLUDED_OPACITY;
}

const NOT_INCLUDED_OPACITY = 0.35;

const StyledInput = styled.input`
  background: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  border: 1px solid ${({ theme }) => theme.commonColors.contrastBorder};
  outline: none;
  flex: 1;
  margin-right: -0.5rem;
  ::selection {
    background: ${({ theme }) => theme.color("*.selectionBackground")};
  }
`;

function PushTreeRepoNode({
  node: { source, target, repo, key },
  hasCheckbox,
}: {
  node: PushTreeRepoNode;
  hasCheckbox?: boolean;
}) {
  const includedRepos = useAtomValue(pushTreeIncludedReposAtom);
  const toggleIncludedRepos = useAtomCallback(toggleSelectionCallback);
  const setTargetBranchName = useSetAtom(pushTargetBranchAtom(repo.dir));
  const setTargetRemote = useSetAtom(pushTargetRemoteAtom(repo.dir));

  const opacity = usePushTreeNodeOpacity(key);
  const [isEditingTargetBranch, setIsEditingTargetBranch] = useState(false);
  const [editingBranchName, setEditingBranchName] = useState(target.branch);
  const submitTargetBranchName = () => {
    setIsEditingTargetBranch(false);
    // setting the state before the menu is closed and focus is gone back to the tree node causes the focus
    // to get lost as the modal window content suspends (for an unnoticeably short time) due to state change.
    // TODO: maybe improve ModalWindow to not let the focus go outside anyway, and add a test case
    setTimeout(() => {
      setTargetBranchName(editingBranchName);
    });
  };
  const addRemote = useAddRemote();
  return (
    <ItemLayout style={{ flex: 1 }}>
      {hasCheckbox && (
        <>
          <TreeNodeCheckbox
            onToggle={() => toggleIncludedRepos(repo.dir)}
            selectionState={
              includedRepos.includes(repo.dir) ? "Selected" : "NotSelected"
            }
          />
          <span style={{ minWidth: 115, opacity }}>
            {getShortRepositoryName(repo)}
          </span>
        </>
      )}
      {!isEditingTargetBranch && (
        <>
          <span style={{ opacity }}>
            {source.type === "commit" ? shortenOid(source.ref) : source.ref}{" "}
            {"\u2192" /* arrow right */}{" "}
            {target.remote && (
              <>
                <MenuTrigger
                  elementType="a"
                  renderMenu={({ menuProps }) => (
                    <SetRemoteMenu repoPath={repo.dir} menuProps={menuProps} />
                  )}
                >
                  <Link>{target.remote}</Link>
                </MenuTrigger>{" "}
                :{" "}
                <Link
                  onPress={() => {
                    setEditingBranchName(target.branch);
                    setIsEditingTargetBranch(true);
                  }}
                  preventFocusOnPress
                >
                  {target.branch}
                </Link>
              </>
            )}
          </span>
          {target.remote && target.isNew && <StyledBadge>New</StyledBadge>}
          {!target.remote && (
            <Link
              onPress={() => {
                addRemote(repo.dir).then((remote) => {
                  if (remote) {
                    setTargetRemote(remote.name);
                  }
                });
              }}
            >
              Define remote
            </Link>
          )}
        </>
      )}
      {isEditingTargetBranch && (
        <StyledInput
          autoFocus
          value={editingBranchName}
          onChange={(e) => setEditingBranchName(e.target.value)}
          onFocus={(e) => {
            e.target.select();
          }}
          onPointerDown={(e) => {
            // Needed to avoid the input field from losing focus on click due to some react-aria logic (maybe detecting
            // outside interaction) trying to move focus to the tree node.
            // Covered by e2e tests ✅
            e.stopPropagation();
          }}
          onBlur={submitTargetBranchName}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
              setIsEditingTargetBranch(false);
            }
            if (e.key === "Enter") {
              submitTargetBranchName();
            }
          }}
        />
      )}
    </ItemLayout>
  );
}

function SetRemoteMenu(
  // TODO(API): improve the API, or at least exposed types.
  //  It's not straightforward to have menu extracted into a separate component
  //  Probably best to work with context and convert renderMenu to menu.
  {
    menuProps,
    repoPath,
  }: {
    menuProps: Parameters<MenuTriggerProps["renderMenu"]>[0]["menuProps"];
    repoPath: string;
  }
) {
  const remotes = useAtomValue(repoRemotesAtoms(repoPath));
  const setTargetRemote = useSetAtom(pushTargetRemoteAtom(repoPath));
  const addRemote = useAddRemote();
  const onAction = (key: Key) => {
    if (key === "addRemote") {
      addRemote(repoPath).then((remote) => {
        if (remote) {
          setTargetRemote(remote.name);
        }
      });
    } else {
      // setting the state before the menu is closed and focus is gone back to the tree node causes the focus
      // to get lost as the modal window content suspends (for an unnoticeably short time) due to state change.
      setTimeout(() => {
        setTargetRemote(`${key}`.split(":").slice(1).join(":"));
      });
    }
  };
  return (
    <Menu {...menuProps} autoFocus="first" onAction={onAction}>
      {remotes
        .map(
          (remote): CollectionElement<object> => (
            <Item key={`remote:${remote.remote}`}>{remote.remote}</Item>
          )
        )
        .concat([
          <Divider key="divider" />,
          <Item key="addRemote">Define remote</Item>,
        ])}
    </Menu>
  );
}
