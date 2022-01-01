export * from "./Tabs";
export * from "./TabCloseButton";
export * from "./TabContentLayout";
export * from "./TabTheme";
export * from "./StyledDefaultTab";
export * from "./StyledDefaultTabs";
export * from "./TabItem";

// These specific versions of tabs can also be seen as independent things outside but on top of "tabs" core impl.
// In that case, in all of these files, we can simply change `jui/tabs/{something}` imports `jui/tabs`. But for now
// that they are a part of "tabs", it's important to not import anything directly from "@intellij-platform/core/Tabs" in those directories,
// as it will create a circular dependency.
export { EditorTabs } from "./EditorTabs";
export { DebuggerTabs } from "./DebuggerTabs";
export { ToolWindowTabs } from "./ToolWindowTabs";
export { TabsOverflowMenu } from "./TabsOverflowMenu";
