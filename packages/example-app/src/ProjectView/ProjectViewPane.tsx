import { Item } from "@react-stately/collections";
import { TreeNode, useTreeData } from "@react-stately/data";
import { identity, sortBy } from "ramda";
import React, { useContext, useEffect, useState } from "react";
import {
  HighlightedTextValue,
  ItemStateContext,
  PlatformIcon,
  Img,
  styled,
  SpeedSearchTree,
} from "jui";
import loading from "../resources/loading.gif";
import loadingDark from "../resources/loading_dark.gif";

type AsyncNode = {
  /**
   * In the absence of useAsyncTreeData, loading state is moved to data. Not ideal, but better than keeping loading
   * state of paths in a separate state, since tree is not updated when that state is changed.
   */
  loadingState?: "loaded" | "loading" | "error";
};
type DirNode = AsyncNode & {
  type: "dir";
  path: string;
  name: string;
};
type FileNode = {
  type: "file";
  path: string;
  name: string;
};

type ProjectNode = AsyncNode & {
  type: "project";
  id: string;
  name: string;
};

type ProjectViewNode = FileNode | DirNode | ProjectNode;

const repoSlug = "adobe/react-spectrum";

export const ProjectViewPane = (): React.ReactElement => {
  const filesTree = useTreeData<ProjectViewNode>({
    initialItems: [
      {
        type: "project",
        id: repoSlug,
        name: repoSlug.split("/")[1],
      },
    ],
    getKey: (node) => ("path" in node ? node.path : node.id),
  });

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    new Set([repoSlug])
  );
  const foldersOnTop = true;
  useEffect(() => {
    console.log("checking expanded keys", expandedKeys);
    [...expandedKeys].forEach(async (key) => {
      const node = filesTree.getItem(key);
      const path = node.value.type === "project" ? "" : node.value.path;
      const shouldLoad =
        (node.value.type === "project" || node.value.type === "dir") &&
        !node.value.loadingState;
      if (shouldLoad) {
        // This shouldn't be needed in the latest versions of ts, but it is, for some reason.
        const nodeValue = node.value as ProjectNode | DirNode;

        filesTree.update(key, { ...nodeValue, loadingState: "loading" });
        const result = await fetch(
          `https://api.github.com/repos/${repoSlug}/contents/${path}`
        );
        if (result.ok) {
          const entries: ProjectViewNode[] = await result.json(); // weak type checking
          filesTree.update(key, { ...nodeValue, loadingState: "loaded" });
          filesTree.insert(key, 0, ...entries);
        } else {
          filesTree.update(key, { ...nodeValue, loadingState: "error" });
        }
      }
    });
  }, [expandedKeys]);

  const sortFn = foldersOnTop
    ? sortBy<TreeNode<ProjectViewNode>>((a) => (a.value.type === "dir" ? 1 : 2))
    : identity;

  return (
    <SpeedSearchTree
      items={sortFn(filesTree.items)}
      fillAvailableSpace
      selectionMode="multiple"
      // selectedKeys={filesTree.selectedKeys}
      // onSelectionChange={selection => filesTree.setSelectedKeys(selection)}
      expandedKeys={expandedKeys}
      onExpandedChange={(newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys as Set<string>);
      }}
    >
      {(item) => (
        <Item
          key={item.key}
          textValue={item.value.name}
          hasChildItems={
            item.value.type === "dir" || item.value.type === "project"
          }
          childItems={sortFn(item.children)}
        >
          <StyledProjectViewTreeNode>
            {<ProjectViewNodeIcon node={item.value} />}
            {item.value.type === "project" ? (
              <>
                <b>
                  <HighlightedTextValue />
                </b>
                <TreeNodeHint>github:{repoSlug}</TreeNodeHint>
              </>
            ) : (
              <HighlightedTextValue />
            )}
            {"loadingState" in item.value &&
              item.value.loadingState === "loading" && (
                <TreeNodeHint>
                  <Img height={16} src={loading} darkSrc={loadingDark} />
                </TreeNodeHint>
              )}
          </StyledProjectViewTreeNode>
        </Item>
      )}
    </SpeedSearchTree>
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

const extensionIconMap: Record<string, string> = {
  editorconfig: "nodes/editorconfig",
  json: "fileTypes/json",
  js: "fileTypes/javaScript",
  css: "fileTypes/css",
  yaml: "fileTypes/yaml",
  java: "fileTypes/java",
  xml: "fileTypes/xml",
  html: "fileTypes/html",
  xhtml: "fileTypes/xhtml",
  gitignore: "vcs/ignore_file",
};

const nodeTypeIconMap: { [key in ProjectViewNode["type"]]?: string } = {
  project: "nodes/folder",
  dir: "nodes/folder",
  file: "fileTypes/text",
};

function findNodeIcon(value: ProjectViewNode): string | null {
  const extension = value.name.split(".").pop();
  return (
    extensionIconMap[extension || ""] ?? nodeTypeIconMap[value.type] ?? null
  );
}

const StyledNodeIcon = styled.span`
  margin-right: 4px;
  display: inline-flex;
`;

function ProjectViewNodeIcon({
  node,
}: {
  node: ProjectViewNode;
}): React.ReactElement {
  const icon = findNodeIcon(node);
  return (
    <StyledNodeIcon>{icon && <PlatformIcon icon={icon} />}</StyledNodeIcon>
  );
}
