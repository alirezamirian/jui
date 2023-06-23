import { DOMAttributes, FocusableElement } from "@react-types/shared";
import { createContext } from "react";
import { PopupProps } from "@intellij-platform/core";

export const PopupContext = createContext<{
  isActive: boolean;
  movable: boolean;
  titleProps: DOMAttributes;
}>({ isActive: false, movable: true, titleProps: {} });

/**
 * A context to provide some props that are necessary for PopupTrigger or PopupManager.
 * Passing those props via context helps with providing a nice API in those components.
 */
export const PopupControllerContext = createContext<
  {
    overlayProps?: DOMAttributes;
  } & Partial<Pick<PopupProps, "positioning" | "onClose">>
>({});
