import { Item } from "@react-stately/collections";
import {
  HighlightedTextValue,
  ItemStateContext,
  PlatformIcon,
  SpeedSearchTree,
  TreeRef,
} from "@intellij-platform/core";
import { identity, sortBy } from "ramda";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultSuspense } from "../DefaultSuspense";
import { useEditorStateManager } from "../Editor/editor.state";
import { DIR_ICON, FILE_ICON, getIconForFile } from "../file-utils";
import { currentProjectState } from "../Project/project.state";
import {
  currentProjectTreeState,
  expandedKeysState,
  FileTreeDirNode,
  FileTreeFileNode,
  FileTreeNode,
  foldersOnTopState,
  ProjectTreeNode,
  projectViewTreeRefState,
  selectedKeysState,
} from "./ProjectView.state";
import { FileStatusColor } from "../VersionControl/FileStatusColor";
import { StyledTreeNodeIconWrapper } from "../TreeUtils/StyledTreeNodeIconWrapper";
import { StyledTreeNodeWrapper } from "../TreeUtils/StyledTreeNodeWrapper";
import { StyledTreeNodeHint } from "../TreeUtils/StyledTreeNodeHint";

export const ProjectViewPane = (): React.ReactElement => {
  const project = useRecoilValue(currentProjectState);
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
        disallowEmptySelection
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
            childItems={
              "children" in item ? sortItems(item.children) : undefined
            }
          >
            <StyledTreeNodeWrapper>
              {<ProjectViewNodeIcon node={item} />}
              {item.type === "project" ? (
                <>
                  <b>
                    <HighlightedTextValue />
                  </b>
                  <StyledTreeNodeHint>{project.path}</StyledTreeNodeHint>
                </>
              ) : (
                <FileTreeNodeText node={item} />
              )}
              {/* {"loadingState" in item &&
                item.loadingState === "loading" && (
                  <TreeNodeHint>
                    <Img height={16} src={loading} darkSrc={loadingDark} />
                  </TreeNodeHint>
                )}*/}
            </StyledTreeNodeWrapper>
          </Item>
        )}
      </SpeedSearchTree>
    </DefaultSuspense>
  );
};

const FileTreeNodeText = ({ node }: { node: FileTreeNode }) => {
  return node.type === "dir" ? (
    // why is the explicit casting necessary? :/ isn't "type" enough for TS to figure out the right type?
    <FileTreeDirNodeText node={node as FileTreeDirNode} />
  ) : (
    <FileTreeFileNodeText node={node as FileTreeFileNode} />
  );
};

const FileTreeDirNodeText = ({}: { node: FileTreeFileNode }) => (
  // TODO: add support for "Highlight directories that contain modified files in the Project tree" (showDirtyRecursively)
  <HighlightedTextValue />
);

const FileTreeFileNodeText = ({
  node,
}: {
  node: FileTreeFileNode;
}): React.ReactElement => {
  const state = useContext(ItemStateContext);
  return state?.isSelected && state?.isFocused ? (
    <HighlightedTextValue />
  ) : (
    <FileStatusColor filepath={node.path}>
      <HighlightedTextValue />
    </FileStatusColor>
  );
};

const nodeTypeIconMap: { [key in ProjectTreeNode["type"]]?: string } = {
  project: "nodes/folder",
  dir: DIR_ICON,
  file: FILE_ICON,
};

function findNodeIcon(value: ProjectTreeNode): string | null {
  if (value.type === "file") {
    return getIconForFile(value.name);
  }
  return nodeTypeIconMap[value.type] ?? null;
}

function ProjectViewNodeIcon({
  node,
}: {
  node: ProjectTreeNode;
}): React.ReactElement {
  const icon = findNodeIcon(node);
  return (
    <StyledTreeNodeIconWrapper>
      {icon && <PlatformIcon icon={icon} />}
    </StyledTreeNodeIconWrapper>
  );
}
