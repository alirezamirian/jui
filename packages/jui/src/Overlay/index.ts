/**
 * Hooks and UI-agnostic components that can be used in implementation of any kind of resizable and/or movable
 * overlay, such as window, popup, etc.
 */
export {
  type Bounds,
  type OverlayInteractionHandlerProps,
  useOverlayInteractionHandler,
  OverlayInteractionHandler,
} from "./OverlayInteractionHandler";

export * from "./useResizableMovableOverlay";
export * from "./OverlayMoveHandle";
export * from "./OverlayResizeHandles";
