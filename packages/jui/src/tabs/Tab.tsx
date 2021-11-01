import { useTab } from "@react-aria/tabs";
import { TabListState } from "@react-stately/tabs";
import { Node } from "@react-types/shared";
import { StyledDefaultTab } from "./StyledDefaultTab";
import React, { useEffect } from "react";

type TabProps<T extends object> = {
  state: TabListState<object>;
  item: Node<T>;
  intersectionObserver: IntersectionObserver | null;
  /**
   * {@see TabsProps#focusable}
   */
  focusable?: boolean;
  /**
   * {@see TabsProps#active}
   */
  active?: boolean;
  Component?: typeof StyledDefaultTab;
};

export const Tab = <T extends object>({
  state,
  item,
  focusable,
  active,
  Component = StyledDefaultTab,
  intersectionObserver,
}: TabProps<T>): React.ReactElement => {
  const { key, rendered } = item;
  const ref = React.useRef(null);
  const {
    tabProps: {
      /**
       * by extracting out tabIndex, all keyboard support of the tabs is disabled, since we prevent the tab from being
       * focusable.
       */
      tabIndex,
      ...tabProps
    },
  } = useTab({ key }, state, ref);
  const isSelected = state.selectedKey === key;
  const isDisabled = state.disabledKeys.has(key);
  useIntersectionObserver(ref, intersectionObserver);

  return (
    <Component
      {...tabProps}
      tabIndex={focusable ? tabIndex : undefined}
      ref={ref}
      active={active}
      selected={isSelected}
      disabled={isDisabled}
    >
      {rendered}
    </Component>
  );
};

function useIntersectionObserver(
  ref: React.MutableRefObject<null>,
  intersectionObserver: IntersectionObserver | null
) {
  useEffect(() => {
    const element = ref.current;
    if (element) {
      intersectionObserver?.observe(element);
      return () => {
        intersectionObserver?.unobserve(element);
      };
    }
  }, [intersectionObserver]);
}
