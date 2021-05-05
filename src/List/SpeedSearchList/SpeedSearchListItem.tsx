import { TextWithHighlights } from "../../TextWithHighlights/TextWithHighlights";
import React from "react";
import { BasicListItem, BasicListItemProps } from "../BasicList/BasicListItem";
import { TextRange } from "../../TextRange";
import { HighlightedTextValueContext } from "../../CollectionSpeedSearch/HighlightedTextValue";

interface SpeedSearchListItemProps<T> extends BasicListItemProps<T> {
  highlightedRanges?: TextRange[] | null;
}
export function SpeedSearchListItem<T>({
  highlightedRanges,
  ...props
}: SpeedSearchListItemProps<T>) {
  const highlightedTextValue = highlightedRanges?.length ? (
    <TextWithHighlights highlights={highlightedRanges}>
      {props.item.textValue}
    </TextWithHighlights>
  ) : (
    <>{props.item.textValue}</>
  );
  return (
    <BasicListItem {...props}>
      {
        // Enable default match highlighting, for simple yet common case of only rendering the text value
        props.item.rendered === props.item.textValue ? (
          highlightedTextValue
        ) : (
          <HighlightedTextValueContext.Provider value={highlightedTextValue}>
            {props.item.rendered}
          </HighlightedTextValueContext.Provider>
        )
      }
    </BasicListItem>
  );
}
