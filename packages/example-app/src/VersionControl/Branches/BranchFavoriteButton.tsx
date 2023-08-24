import React from "react";
import {
  AutoHoverPlatformIcon,
  PlatformIcon,
  styled,
} from "@intellij-platform/core";

const StyledMenuIconButton = styled.span.attrs({ role: "button" })`
  display: inline-flex;
`;

export function BranchFavoriteButton({
  onClick,
  isFavorite,
  isCurrent,
}: {
  isCurrent?: boolean;
  isFavorite: boolean;
  onClick: () => void;
}) {
  const getIcon = () => {
    if (isCurrent) {
      return (
        <AutoHoverPlatformIcon
          icon={
            isFavorite
              ? "/platform/dvcs-impl/resources/icons/currentBranchFavoriteLabel.svg"
              : "/platform/dvcs-impl/resources/icons/currentBranchLabel.svg"
          }
          hoverIcon={
            isFavorite ? "nodes/favorite.svg" : "nodes/notFavoriteOnHover.svg"
          }
          hoverContainerSelector="[role='menuitem']"
        />
      );
    }
    if (isFavorite) {
      return <PlatformIcon icon="nodes/favorite.svg" />;
    } else {
      return (
        <AutoHoverPlatformIcon
          icon="nodes/emptyNode.svg"
          hoverIcon="nodes/notFavoriteOnHover.svg"
          hoverContainerSelector="[role='menuitem']"
        />
      );
    }
  };
  return (
    <StyledMenuIconButton
      onPointerUp={(e) => {
        e.stopPropagation();
      }}
      onClick={onClick}
    >
      {getIcon()}
    </StyledMenuIconButton>
  );
}
