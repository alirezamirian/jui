import React, { CSSProperties, ForwardedRef } from "react";
import {
  AriaListBoxOptions,
  useListBox,
  useListBoxSection,
  useOption,
} from "@react-aria/listbox";
import { useObjectRef } from "@react-aria/utils";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";

import {
  CollectionFocusProxyProps,
  ItemStateContext,
  useCollectionFocusProxy,
} from "@intellij-platform/core/Collections";
import { StyledListItem } from "@intellij-platform/core/List/StyledListItem";
import { StyledList } from "@intellij-platform/core/List/StyledList";
import { StyledVerticalSeparator } from "@intellij-platform/core/StyledSeparator";
import { styled } from "@intellij-platform/core/styled";

interface StatelessListBoxProps<T extends object>
  extends AriaListBoxOptions<T>,
    CollectionFocusProxyProps {
  state: ListState<T>;
  style?: CSSProperties;
  className?: string;
}

export const StatelessListBox = React.forwardRef(function StatelessListBox<
  T extends object
>(
  {
    state,
    style,
    className,
    focusProxyRef,
    ...props
  }: StatelessListBoxProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const ref = useObjectRef(forwardedRef);
  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  useCollectionFocusProxy({
    state,
    collectionRef: ref,
    focusProxyRef,
    onAction: props.onAction,
  });

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <StyledList
        {...listBoxProps}
        ref={ref}
        style={style}
        className={className}
      >
        {[...state.collection].map((item) =>
          item.type === "section" ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          )
        )}
      </StyledList>
    </>
  );
});
function Option<T extends object>({
  item,
  state,
}: {
  item: Node<T>;
  state: ListState<T>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { optionProps } = useOption({ key: item.key }, state, ref);

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.focusedKey === item.key;
  return (
    <ItemStateContext.Provider
      value={{
        isDisabled,
        isContainerFocused: state.selectionManager.isFocused,
        isSelected,
        node: item,
      }}
    >
      <StyledListItem
        {...optionProps}
        ref={ref}
        disabled={isDisabled}
        selected={isSelected}
        containerFocused
      >
        {item.rendered}
      </StyledListItem>
    </ItemStateContext.Provider>
  );
}

const StyledSectionHeading = styled.div`
  font-size: 0.6875rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.commonColors.inactiveTextColor}; // not verified
`;

const StyledSection = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
`;

function ListBoxSection<T extends object>({
  section,
  state,
}: {
  section: Node<T>;
  state: ListState<T>;
}) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <StyledVerticalSeparator role="presentation" />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <StyledSectionHeading {...headingProps}>
            {section.rendered}
          </StyledSectionHeading>
        )}
        <StyledSection {...groupProps}>
          {[
            ...(state.collection.getChildren?.(section.key) ??
              section.childNodes),
          ].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </StyledSection>
      </li>
    </>
  );
}
