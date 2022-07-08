import React from "react";
import { getAllRanges, TextRange } from "../TextRange";
import { styled } from "../styled";

const HighlightedMatch = styled.span`
  background: ${({ theme }) =>
    `linear-gradient(${theme.color(
      "SearchMatch.startBackground",
      "#ffeaa2b3"
    )}, ${theme.color("SearchMatch.endBackground", "#ffd042b3")})`};
  color: #000;
  border-radius: 3px;
`;

/**
 * Renders the children (which must be a string), with highlights wrapped in spans with the highlight style.
 * Note: this component doesn't render a container. It just highlights the specified ranges.
 */
export function TextWithHighlights({
  children,
  highlights,
}: {
  children: string;
  highlights: TextRange[] | null;
}): React.ReactElement {
  const parts: Array<[TextRange, boolean]> = highlights
    ? getAllRanges(highlights, children.length)
    : [[{ from: 0, to: children.length }, false]];
  return (
    <>
      {parts.map(([{ from, to }, highlighted]) => {
        const text = children.slice(from, to + 1);
        return (
          // TODO: key
          <React.Fragment key={`${from}_${to}`}>
            {highlighted ? <HighlightedMatch>{text}</HighlightedMatch> : text}
          </React.Fragment>
        );
      })}
    </>
  );
}
