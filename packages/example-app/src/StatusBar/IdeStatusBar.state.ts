import { atom } from "recoil";
import { Bounds } from "@intellij-platform/core";

export const showProgressPanelState = atom({
  key: "ide.statusbar.showProgressPanel",
  default: false,
});
export const tasksPopupBoundsState = atom<Bounds | null>({
  key: "ide.statusbar.tasksPopup",
  default: null,
});
