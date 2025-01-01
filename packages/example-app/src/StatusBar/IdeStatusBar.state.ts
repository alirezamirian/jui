import { Bounds } from "@intellij-platform/core";
import { atom } from "jotai";

export const showProgressPanelAtom = atom(false);
export const tasksPopupBoundsAtom = atom<Bounds | null>(null);
