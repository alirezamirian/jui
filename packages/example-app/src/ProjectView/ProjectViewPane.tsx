import { Item } from "@react-stately/collections";
import {
  HighlightedTextValue,
  ItemStateContext,
  PlatformIcon,
  SpeedSearchTree,
  styled,
  TreeRef,
} from "@intellij-platform/core";
import { identity, sortBy } from "ramda";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultSuspense } from "../DefaultSuspense";
import { useEditorStateManager } from "../Editor/editor.state";
import { FILE_ICON, getIconForFile } from "../file-utils";
import { currentProjectState } from "../Project/project.state";
import {
  currentProjectTreeState,
  expandedKeysState,
  foldersOnTopState,
  ProjectTreeNode,
  projectViewTreeRefState,
  selectedKeysState,
} from "./ProjectView.state";

export const ProjectViewPane = (): React.ReactElement => {
  const { slug: repoSlug } = useRecoilValue(currentProjectState);
  const editor = useEditorStateManager();
  const treeRef = useRef<TreeRef>(null);
  const setProjectViewTreeRef = useSetRecoilState(projectViewTreeRefState);
  useLayoutEffect(() => {
    setProjectViewTreeRef(treeRef);
  }, [treeRef]);

  const projectTree = useRecoilValue(currentProjectTreeState);

  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const foldersOnTop = useRecoilValue(foldersOnTopState);

  const sortItems = foldersOnTop
    ? sortBy<ProjectTreeNode>((a) => (a.type === "dir" ? 1 : 2))
    : identity;

  return (
    <DefaultSuspense>
      <SpeedSearchTree
        ref={treeRef}
        items={[projectTree] as ProjectTreeNode[]}
        onAction={(path) => {
          editor.openPath(`${path}`);
        }}
        fillAvailableSpace
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        {(item) => (
          <Item
            key={item.path}
            textValue={item.name}
            hasChildItems={"children" in item}
            childItems={
              "children" in item ? sortItems(item.children) : undefined
            }
          >
            <StyledProjectViewTreeNode>
              {<ProjectViewNodeIcon node={item} />}
              {item.type === "project" ? (
                <>
                  <b>
                    <HighlightedTextValue />
                  </b>
                  <TreeNodeHint>github:{repoSlug}</TreeNodeHint>
                </>
              ) : (
                <HighlightedTextValue />
              )}
              {/* {"loadingState" in item &&
                item.loadingState === "loading" && (
                  <TreeNodeHint>
                    <Img height={16} src={loading} darkSrc={loadingDark} />
                  </TreeNodeHint>
                )}*/}
            </StyledProjectViewTreeNode>
          </Item>
        )}
      </SpeedSearchTree>
    </DefaultSuspense>
  );
};

const StyledTreeNodeHint = styled.span<{ inheritColor: boolean }>`
  display: inline-flex;
  color: ${({ theme, inheritColor }) =>
    inheritColor ? "inherit" : theme.commonColors.inactiveTextColor};
  padding-left: 8px;
`;

const StyledProjectViewTreeNode = styled.div`
  display: flex;
  align-items: center;
`;
const TreeNodeHint: React.FC = ({ children }) => {
  const { isSelected, isFocused } = useContext(ItemStateContext) || {
    isSelected: false,
    isFocused: false,
  };
  return (
    <StyledTreeNodeHint inheritColor={isSelected && isFocused}>
      {children}
    </StyledTreeNodeHint>
  );
};

const nodeTypeIconMap: { [key in ProjectTreeNode["type"]]?: string } = {
  project: "nodes/folder",
  dir: "nodes/folder",
  file: FILE_ICON,
};

function findNodeIcon(value: ProjectTreeNode): string | null {
  if (value.type === "file") {
    return getIconForFile(value.name);
  }
  return nodeTypeIconMap[value.type] ?? null;
}

const StyledNodeIcon = styled.span`
  margin-right: 4px;
  display: inline-flex;
`;

function ProjectViewNodeIcon({
  node,
}: {
  node: ProjectTreeNode;
}): React.ReactElement {
  const icon = findNodeIcon(node);
  return (
    <StyledNodeIcon>{icon && <PlatformIcon icon={icon} />}</StyledNodeIcon>
  );
}
