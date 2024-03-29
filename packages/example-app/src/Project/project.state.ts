import {
  atom,
  selector,
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import { dirContentState, FsItem } from "../fs/fs.state";
import { filterPath } from "./project-utils";
import { createFocusBasedSetterHook } from "../recoil-utils";
import path from "path";

export interface Project {
  name: string;
  path: string;
}
export interface ProjectFsItem extends FsItem {
  relativePath: string;
}

export const sampleRepos = {
  JUI: {
    path: "/workspace/jui",
    url: "https://github.com/alirezamirian/jui.git",
  },
  "React Spectrum": {
    path: "/workspace/react-spectrum",
    url: "https://github.com/adobe/react-spectrum.git",
  },
  Recoil: {
    path: "/workspace/recoil",
    url: "https://github.com/facebookexperimental/Recoil.git",
  },
  ExampleRepo: {
    path: "/workspace/example-repo",
    url: "https://github.com/thurwitz/example-branches.git",
  },
};
const sampleRepoKey: keyof typeof sampleRepos = "JUI";

/**
 * temporary hard coded sample repo, until clone UI is implemented.
 */
export const sampleRepo = sampleRepos[sampleRepoKey];

export const currentProjectState = atom<Project>({
  key: "project",
  default: {
    name: "Workspace",
    path: "/workspace",
  },
});

export const projectFilePath = selectorFamily({
  key: "projectFilePath",
  get:
    (projectRelativePath: string) =>
    ({ get }) =>
      path.join(get(currentProjectState).path, projectRelativePath),
});

export const currentProjectFilesState = selector({
  key: "project.current.files",
  get: async ({ get }): Promise<ProjectFsItem[]> => {
    const project = get(currentProjectState);
    return get(projectFilesState(project.path));
  },
});

export const projectFilesState = selectorFamily({
  key: "project.files",
  get:
    (
      projectPath: string /* could be changed to project id, when project entity is more mature */
    ) =>
    async ({ get }): Promise<ProjectFsItem[]> => {
      const items = get(dirContentState(projectPath));
      const files: ProjectFsItem[] = [];
      const addItem = (item: FsItem) => {
        if (item.type === "dir") {
          if (filterPath(item)) {
            const childItems = get(dirContentState(item.path));
            if (childItems) {
              childItems.forEach(addItem);
            }
          }
        } else {
          files.push({
            ...item,
            relativePath: path.relative(projectPath, item.path),
          });
        }
      };
      (items || []).forEach((item) => addItem(item));
      return files;
    },
});

export const useRefreshCurrentProjectFiles = () =>
  useRecoilRefresher_UNSTABLE(currentProjectFilesState);

/**
 * file/dir paths relevant to the currently active (focused) UI part. Different UI components such as Editor,
 * ProjectView or ChangesView set this context when they get focused. The context can then be used in different actions
 * that operate on files/folders.
 * While this allows for contextual actions, without any specific support for "Action Data" from the action system,
 * it has some drawbacks, because of which it may make sense to add support for Action Data:
 * - When an action is not triggered by a shortcut, but by clicking an action button, the focused element doesn't
 *   matter. For example, if the editor is focused and "Rollback" action is triggered via the shortcut, then the active
 *   path in the editor defines the initially included changes, in the Rollback window. But if the action is triggered
 *   by clicking the rollback button, while the editor is focused, the editor is ignored, and the initially included
 *   changes are set based on selected nodes in ChangesView (which is the default source for initially included changes).
 *   Whether that behaviour is a good thing or not, in order to follow it, having support for Action Data, will help
 *   implementing this behavior, since the action data will be set based on the context, only when the action is
 *   triggered via shortcut.
 *   UPDATE: that's fixed now by introducing the optional `event` argument passed to actionPerformed, which gives us a
 *   chance to know if the action was performed by a shortcut or by clicking an action button.
 * - Action data would allow for lazy evaluation of the required data, only when the action is triggered via a shortcut,
 *   and based on the dom element from which the event is triggered. While in the current approach, the data is
 *   unnecessarily updated as it changes and the data-holder component is focused.
 * - It involves focus/blur event handling to keep track of the current value, for any such focus-based contextual
 *   value. Support for associating event data with elements would not need focus/blur event handling.
 *
 *  @see useActivePathsProvider
 */
export const activePathsState = atom<string[]>({
  key: "project.activePaths",
  default: [],
});

/**
 * Sets the value of {@link activePathsState} when focused.
 * @returns focus/blur handling props, to be applied on the container which should set the active path state
 */
export const useActivePathsProvider = createFocusBasedSetterHook(
  activePathsState,
  []
);
