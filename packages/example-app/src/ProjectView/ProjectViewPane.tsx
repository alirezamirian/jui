import { Item } from "@react-stately/collections";
import {
  HighlightedTextValue,
  ItemStateContext,
  PlatformIcon,
  SpeedSearchTree,
  styled,
} from "jui";
import { identity, sortBy } from "ramda";
import React, { useContext } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DefaultSuspense } from "../DefaultSuspense";
import { useEditor } from "../Editor/editor.state";
import { currentProjectState } from "../Project/project.state";
import {
  currentProjectTreeState,
  expandedKeysState,
  foldersOnTopState,
  ProjectTreeNode,
  selectedKeysState,
} from "./ProjectView.state";

export const ProjectViewPane = (): React.ReactElement => {
  const { slug: repoSlug } = useRecoilValue(currentProjectState);
  const editor = useEditor();

  const projectTree = useRecoilValue(currentProjectTreeState);

  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const foldersOnTop = useRecoilValue(foldersOnTopState);

  const sortFn = foldersOnTop
    ? sortBy<ProjectTreeNode>((a) => (a.type === "dir" ? 1 : 2))
    : identity;

  return (
    <DefaultSuspense>
      <SpeedSearchTree
        items={[projectTree] as ProjectTreeNode[]}
        onAction={(path) => {
          editor.openPath(`${path}`);
        }}
        fillAvailableSpace
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={(newExpandedKeys) => {
          setExpandedKeys(newExpandedKeys as Set<string>);
        }}
      >
        {(item) => (
          <Item
            key={item.path}
            textValue={item.name}
            hasChildItems={"children" in item}
            childItems={"children" in item ? sortFn(item.children) : undefined}
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

const nodeTypeIconMap: { [key in ProjectTreeNode["type"]]?: string } = {
  project: "nodes/folder",
  dir: "nodes/folder",
  file: "fileTypes/text",
};

function findNodeIcon(value: ProjectTreeNode): string | null {
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
  node: ProjectTreeNode;
}): React.ReactElement {
  const icon = findNodeIcon(node);
  return (
    <StyledNodeIcon>{icon && <PlatformIcon icon={icon} />}</StyledNodeIcon>
  );
}
