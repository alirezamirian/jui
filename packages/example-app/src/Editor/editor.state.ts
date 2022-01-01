import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { Focusable } from "../common-types";
import { currentProjectFilesState } from "../Project/project.state";
import { descend, sortBy, sortWith } from "ramda";

interface TextEditorState {
  cursorPos: { lineNumber: number; column: number };
}
type EditorState = TextEditorState;

interface EditorTabState {
  editorState: EditorState;
  filePath: string;
}

// it should become something under "project" state later.
const editorTabsState = atom<EditorTabState[]>({
  key: "editor.tabs",
  default: selector({
    key: "editor.tabs/Default",
    get: ({ get }) =>
      sortWith(
        [
          // first README.md, then ts and js files.
          descend((file) => file.path === "README.md"),
          descend((file) => file.path.endsWith(".ts")),
          descend((file) => file.path.endsWith(".js")),
        ],
        get(currentProjectFilesState).items.filter(
          (item) => item.type === "file"
        )
      )
        .slice(0, 12)
        // map project file to editor state object
        .map((file) => ({
          filePath: file.path,
          editorState: { cursorPos: { lineNumber: 0, column: 0 } },
        })),
  }),
});

const activeEditorTabIndexState = atom<number>({
  key: "editor.activeTabIndex",
  default: 0,
});

export const activeEditorTabState = selector({
  key: "editor.activeTab",
  get: ({ get }) => get(editorTabsState)[get(activeEditorTabIndexState)],
});

/**
 * could be a global variable also, since there is no re-rendering need for it. It's kept as an atom, just to avoid
 * global variable and its issues.
 */
export const editorRefState = atom<null | Focusable>({
  key: "editor.focusHandle",
  default: null,
});

export interface EditorStateManager {
  tabs: EditorTabState[];
  openPath(filePath: string, focus?: boolean): void;
  closePath(path: string): void;
  closeTab(index: number): void;
  select(index: number): void;
}

export const useEditorStateManager = (): EditorStateManager => {
  const [tabsState, setTabsState] = useRecoilState(editorTabsState);
  const setActiveTabIndex = useSetRecoilState(activeEditorTabIndexState);
  const focus = useRecoilCallback(
    ({ snapshot }) => () => {
      snapshot.getLoadable(editorRefState).valueOrThrow()?.focus();
    },
    []
  );

  const select = (index: number) => {
    setActiveTabIndex(index);
  };
  const closePath = (filePath: string) => {
    const index = tabsState.findIndex((tab) => tab.filePath === filePath);
    if (index > -1) {
      closeTab(index);
    }
  };
  const openPath = (filePath: string, shouldFocus = true) => {
    const index = tabsState.findIndex((tab) => tab.filePath === filePath);
    if (index > -1) {
      select(index);
    } else {
      const newIndex = tabsState.length;
      setTabsState((currentState) => [
        ...currentState,
        {
          filePath,
          editorState: { cursorPos: { lineNumber: 0, column: 0 } }, // no persistence of cursor position for now.
        },
      ]);
      select(newIndex);
    }
    if (shouldFocus) {
      focus();
    }
  };
  const closeTab = (index: number) => {
    setTabsState((tabsState) =>
      tabsState.filter((_, tabIndex) => tabIndex !== index)
    );
  };
  return {
    tabs: tabsState,
    // This should become an action. Something like "open project file", when action system is implemented.
    openPath,
    closePath,
    closeTab,
    select,
  };
};
