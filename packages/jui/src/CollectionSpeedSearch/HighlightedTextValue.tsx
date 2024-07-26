import React, { Key, useContext } from "react";
import { TextWithHighlights } from "@intellij-platform/core/TextWithHighlights/TextWithHighlights";
import { TextRange } from "@intellij-platform/core/TextRange";
import { CollectionSpeedSearchContext } from "@intellij-platform/core/CollectionSpeedSearch/CollectionSpeedSearchContext";

type CollectionSpeedSearchItemContextValue = {
  text: string;
  highlightedRanges: null | TextRange[];
};

const CollectionSpeedSearchItemContext =
  React.createContext<null | CollectionSpeedSearchItemContextValue>(null);

export const SpeedSearchItemHighlightsProvider: React.FC<{
  children?: React.ReactNode;
  itemKey: Key;
}> = ({ children, itemKey }) => {
  const context = useContext(CollectionSpeedSearchContext);
  if (!context) {
    throw new Error(
      `SpeedSearchItemProvider is only meant to be rendered by collection components with speed search. 
      CollectionSpeedSearchContext is expected to be rendered as a wrapper around all items.`
    );
  }
  const item = context.collection.getItem(itemKey);
  const text = item?.textValue ?? "";
  if (!text && item?.props.textValue === undefined) {
    console.warn(
      "no textValue specified on Item. When using SpeedSearch, you need to specify textValue for item, which will be the basis for search"
    );
  }
  return (
    <CollectionSpeedSearchItemContext.Provider
      value={{
        highlightedRanges: context.matches.get(itemKey) || null,
        text: text,
      }}
    >
      {children}
    </CollectionSpeedSearchItemContext.Provider>
  );
};

/**
 * Used inside Item content, to render the textValue of the Item, potentially with highlighted ranges if it's a match
 * in current search.
 */
export const HighlightedTextValue = function ({
  Component = "span",
}: {
  /**
   * When rendering in a flex parent (which is the case for tree or list), rendering a container is necessary to have
   * the right spacing around highlights, when the highlighter span is immediately followed or proceeded by a white
   * space. By default, a "span" is rendered.
   */
  Component?: React.ElementType;
}) {
  const speedSearchContext = React.useContext(CollectionSpeedSearchItemContext);
  if (!speedSearchContext) {
    throw new Error(
      "HighlightedTextValue should be rendered only in items of a speed search enabled collection component"
    );
  }
  const { highlightedRanges, text } = speedSearchContext;
  return (
    <Component>
      {highlightedRanges ? (
        <TextWithHighlights highlights={highlightedRanges}>
          {text}
        </TextWithHighlights>
      ) : (
        text
      )}
    </Component>
  );
};
