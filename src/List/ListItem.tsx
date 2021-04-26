import { Node } from "@react-types/shared";
import { ListState } from "@react-stately/list";
import React from "react";
import { useSelectableItem } from "@react-aria/selection";
import { usePress } from "@react-aria/interactions";
import { TextRange } from "../TextRange";
import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";
import { HighlightedTextValueContext } from "../selection/CollectionSpeedSearch/HighlightedTextValue";
import { StyledListItem } from "./StyledListItem";

export function ListItem<T>({
  listFocused,
  item,
  state,
  highlightedRanges,
}: {
  listFocused: boolean;
  item: Node<T>;
  highlightedRanges?: TextRange[] | null;
  state: ListState<T>;
}) {
  const ref = React.useRef(null);
  const disabled = state.disabledKeys.has(item.key);
  const selected = state.selectionManager.isSelected(item.key);

  const { itemProps } = useSelectableItem({
    key: item.key,
    ref,
    selectionManager: state.selectionManager,
  });
  let { pressProps } = usePress({
    ...itemProps,
    isDisabled: disabled,
    preventFocusOnPress: false,
  });

  const highlightedTextValue = highlightedRanges?.length ? (
    <TextWithHighlights highlights={highlightedRanges}>
      {item.textValue}
    </TextWithHighlights>
  ) : (
    <>{item.textValue}</>
  );

  return (
    <StyledListItem
      listFocused={listFocused}
      selected={selected}
      aria-disabled={disabled}
      aria-selected={selected}
      {...pressProps}
      ref={ref}
    >
      {
        // Enable default match highlighting, for simple yet common case of only rendering the text value
        item.rendered === item.textValue ? (
          highlightedTextValue
        ) : (
          <HighlightedTextValueContext.Provider value={highlightedTextValue}>
            {item.rendered}
          </HighlightedTextValueContext.Provider>
        )
      }
    </StyledListItem>
  );
}
