/**
 * Hooks and UI-agnostic components that can be used in implementation of any kind of resizable and/or movable
 * window/pane.
 */
export {
  type Bounds,
  type WindowInteractionHandlerProps,
  useWindowInteractionHandler,
  WindowInteractionHandler,
} from "./WindowInteractionHandler";

export * from "./useResizableMovableWindow";
export * from "./WindowMoveHandle";
export * from "./WindowResizeHandles";
