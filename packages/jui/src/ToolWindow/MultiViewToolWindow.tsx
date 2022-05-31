import React, { Key, useEffect, useState } from "react";
import { useControlledState } from "@react-stately/utils";
import { DefaultToolWindow, DefaultToolWindowProps } from "./DefaultToolWindow";
import { TabItem } from "../Tabs/TabItem";
import { usePrevious } from "../utils/usePrevious";
import { ToolWindowTabs } from "../Tabs/ToolWindowTabs/ToolWindowTabs";

export interface MultiContentToolWindowProps
  extends Pick<DefaultToolWindowProps, "additionalActions"> {
  /**
   * List of contents that will be accessible with a list of grouped or ungrouped tabs in the tool window header.
   */
  children:
    | React.ReactElement<MultiContentToolWindowContentProps>[]
    | React.ReactElement<MultiContentToolWindowContentProps>;
  /**
   * Key of currently active content
   */
  activeKey?: Key;
  defaultActiveKey?: Key;
  onActiveKeyChange?: (key: Key) => void;
  /**
   * If true, it groups tabs in a dropdown instead.
   *
   * @default false
   */
  groupTabs?: boolean;
  /**
   * The content shown as the title of the tool window, before content switcher (tabs or dropdown).
   * For more control over header content, you can pass a function which accepts rendered content switcher,
   * and then you can compose it with other content as you wish. Use case examples of function variant:
   * - You want to render a title before the content switcher, and something after the tabs. Like a "+" button in
   *   terminal.
   * - You want to conditionally move inner-content header up to the tool window header, if there is only one tab. In
   *   that case you don't need to render the content switcher at all. An example is the new design in the "Run"
   *   tool window.
   */
  headerContent?:
    | React.ReactNode
    | ((props: { renderedViewSwitcher: React.ReactNode }) => React.ReactNode);
}

/**
 * Implemented on top of DefaultToolWindow, allows for multiple tabbed content within a tool window.
 * Remaining features:
 * - Although trivial, group tabs action in tool window header gear icon is intentionally left unimplemented for now,
 *   until an increment on action system is done.
 * - Grouped mode is not implemented currently, as we don't have a dropdown component. Though it seems it's just a
 *   MenuTrigger and some trigger with a arrow icon.
 */
export const MultiViewToolWindow = ({
  groupTabs,
  children,
  headerContent,
  ...props
}: MultiContentToolWindowProps) => {
  const [isToolWindowFocused, setToolWindowFocused] = useState(false);
  const [activeKey, setActiveKey] = useControlledState(
    props.activeKey!,
    props.defaultActiveKey!,
    props.onActiveKeyChange!
  );
  const contents = React.Children.toArray(children).filter(
    (
      child
    ): child is React.ReactElement<MultiContentToolWindowContentProps> => {
      const validChild =
        React.isValidElement(child) &&
        child.type === MultiContentToolWindowContent;
      if (!validChild) {
        // FIXME: only warn in dev mode
        console.warn(
          "You are not supposed to render anything but MultiContentToolWindowContent inside MultiViewToolWindow. Rendered: ",
          child
        );
      }
      return validChild;
    }
  );
  const renderContentSwitcher = () => {
    if (groupTabs) {
      console.error(
        "groupTab is not supported yet in MultiViewToolWindow. Will fallback to ungrouped tabs"
      );
    }
    return (
      <ToolWindowTabs
        noBorders
        items={contents}
        active={isToolWindowFocused}
        selectedKey={activeKey}
        onSelectionChange={setActiveKey}
      >
        {(item) => <TabItem key={item.key}>{item.props.tabContent}</TabItem>}
      </ToolWindowTabs>
    );
  };
  const renderedViewSwitcher = renderContentSwitcher();

  // We set the active key if it's not set or is invalid. A common scenario is when tabs are closable, and when the
  // active tab is closed. You would always want to previous tab to get activated in such cases, instead of the first
  // one. By having the logic here, there is no need to repeat the same logic in each use case. Although, it can also
  // be moved into a state management utility for tabs, maybe in the future.

  const keys = contents.map(({ key }) => key);
  const previousKeys = usePrevious(keys);
  useEffect(() => {
    if (!keys.includes(activeKey)) {
      const newActiveKey = keys[previousKeys.indexOf(activeKey) - 1] ?? keys[0];
      if (newActiveKey != undefined) {
        setActiveKey(newActiveKey);
      }
    }
  });

  const activeContent = contents.find(
    (content) => activeKey == undefined || activeKey === content.key
  );
  return (
    <DefaultToolWindow
      onFocusChange={setToolWindowFocused}
      headerContent={
        typeof headerContent === "function" ? (
          headerContent({ renderedViewSwitcher })
        ) : (
          <>
            {headerContent}
            {renderedViewSwitcher}
          </>
        )
      }
      additionalActions={props.additionalActions}
    >
      {activeContent?.props.children}
    </DefaultToolWindow>
  );
};

export interface MultiContentToolWindowContentProps {
  key: Key;
  /**
   * Used in the corresponding tab.
   */
  tabContent: React.ReactNode;

  children: React.ReactNode;
}

const MultiContentToolWindowContent = ({}: MultiContentToolWindowContentProps) => {
  throw new Error(
    "MultiContentToolWindowContent is not meant to be rendered directly. You should only use it in MultiViewToolWindow"
  );
};

MultiViewToolWindow.View = MultiContentToolWindowContent;
