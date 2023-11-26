import path from "path";
import React, { useContext } from "react";
import { splitWhen } from "ramda";
import {
  ItemLayout,
  ItemStateContext,
  PlatformIcon,
  TextRange,
  TextWithHighlights,
} from "@intellij-platform/core";

import {
  StyledIconWrapper,
  StyledItemLayout,
  StyledTitleWrapper,
} from "../ItemHelpers";
import { ProjectFsItem } from "../../../Project/project.state";
import { getIconForFile } from "../../../file-utils";

/**
 * UI of paths in SearchEverywhere list.
 */
export function FileItem({
  file,
  matches,
}: {
  file: ProjectFsItem;
  /**
   * matches on file.relativePath
   */
  matches: null | TextRange[];
}) {
  const { isSelected } = useContext(ItemStateContext) || {};
  const title = file.name;
  const dir = path.dirname(file.relativePath);

  const [dirMatches, filenameMatches] = splitWhen<TextRange, TextRange>(
    (match) => match.from >= dir.length,
    matches || []
  );
  const titleMatches = filenameMatches.map(({ from, to }) => ({
    from: from - dir.length,
    to: to - dir.length,
  }));
  return (
    <StyledItemLayout>
      <StyledIconWrapper>
        <PlatformIcon icon={getIconForFile(file.path)} />
      </StyledIconWrapper>
      <StyledTitleWrapper>
        {isSelected ? (
          <TextWithHighlights highlights={titleMatches}>
            {title}
          </TextWithHighlights>
        ) : (
          title
        )}
      </StyledTitleWrapper>
      <ItemLayout.Hint>
        {isSelected ? (
          <TextWithHighlights highlights={dirMatches}>{dir}</TextWithHighlights>
        ) : (
          dir
        )}
      </ItemLayout.Hint>
    </StyledItemLayout>
  );
}
