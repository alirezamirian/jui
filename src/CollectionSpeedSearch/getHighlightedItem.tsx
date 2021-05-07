import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";
import React from "react";
import { TextRange } from "../TextRange";
import { HighlightedTextValueContext } from "./HighlightedTextValue";
import { Node } from "@react-types/shared";

export function getHighlightedItem<T>(
  item: Node<T>,
  highlightedRanges: TextRange[] | null
): Node<T> {
  const highlightedTextValue = highlightedRanges?.length ? (
    <TextWithHighlights highlights={highlightedRanges}>
      {item.textValue}
    </TextWithHighlights>
  ) : (
    <>{item.textValue}</>
  );
  const rendered =
    item.rendered === item.textValue ? (
      highlightedTextValue
    ) : (
      <HighlightedTextValueContext.Provider value={highlightedTextValue}>
        {item.rendered}
      </HighlightedTextValueContext.Provider>
    );
  return {
    ...item,
    rendered,
  };
}

export function SpeedSearchCollectionItem<T>({
  highlightedRanges,
  children,
  item,
}: {
  highlightedRanges: TextRange[] | null;
  item: Node<T>;
  children: (item: Node<T>) => React.ReactElement;
}) {
  return children(getHighlightedItem(item, highlightedRanges));
}
