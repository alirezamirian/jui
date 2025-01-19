import path from "path";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { createRef, MutableRefObject } from "react";
import {
  AlertDialogApi,
  PopupManagerAPI,
  WindowManagerAPI,
} from "@intellij-platform/core";

import { dirContentAtom, FsItem } from "../fs/fs.state";
import { createFocusBasedSetterHook } from "../atom-utils/focus-based-atom-utils";
import { filterPath } from "./project-utils";

export interface Project {
  name: string;
  path: string;
}
export interface ProjectFsItem extends FsItem {
  relativePath: string;
}

export const autoClonedRepo = {
  path: "/workspace/jui",
  url: "https://github.com/alirezamirian/jui.git",
};

export const defaultProject = {
  name: "Workspace",
  path: "/workspace",
};
export const currentProjectAtom = atom<Project>(defaultProject);

export const projectFilePath = atomFamily((projectRelativePath: string) =>
  atom((get) => path.join(get(currentProjectAtom).path, projectRelativePath))
);

export const currentProjectFilesAtom = atom(
  async (get): Promise<ProjectFsItem[]> => {
    const project = get(currentProjectAtom);
    return get(projectFilesAtom(project.path));
  }
);

const projectFilesAtom = atomFamily(
  (
    projectPath: string /* could be changed to project id, when project entity is more mature */
  ) =>
    atom(async (get): Promise<ProjectFsItem[]> => {
      const items = await get(dirContentAtom(projectPath));
      const files: ProjectFsItem[] = [];
      const addItem = async (item: FsItem) => {
        if (item.type === "dir") {
          if (filterPath(item)) {
            const childItems = await get(dirContentAtom(item.path));
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
      await Promise.all((items || []).map((item) => addItem(item)));
      return files;
    })
);
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
export const activePathsAtom = atom<string[]>([]);

export const activePathExistsAtom = atom(
  (get) => get(activePathsAtom).length > 0
);

/**
 * Sets the value of {@link activePathsAtom} when focused.
 * @returns focus/blur handling props, to be applied on the container which should set the active path state
 */
export const useActivePathsProvider = createFocusBasedSetterHook(
  activePathsAtom,
  []
);

/**
 * Ref to the popup manager of the current project.
 * TODO(multi-project): either:
 *  - introduce project-level store provider, to keep such states per project.
 *  - maybe better, add a feature to the action system, where ActionProvider can define additional contextual properties
 *    to be made available in `context` when calling `actionPerformed` method. The biggest challenge for a nice
 *    implementation of such feature is static type safety.
 */
export const projectPopupManagerRefAtom = atom<
  MutableRefObject<PopupManagerAPI | null>
>(createRef<PopupManagerAPI | null>());

export const windowManagerRefAtom = atom<
  MutableRefObject<WindowManagerAPI | null>
>(createRef<WindowManagerAPI | null>());

export const alertDialogRefAtom = atom<MutableRefObject<AlertDialogApi | null>>(
  createRef<AlertDialogApi | null>()
);
