import React, { HTMLProps } from "react";
import { mergeProps } from "@react-aria/utils";
import { SpeedSearchPopup } from "./SpeedSearchPopup";
import {
  SpeedSearchStateProps,
  useSpeedSearch,
  useSpeedSearchState,
} from "./useSpeedSearch";
import { SpeedSearchContainer } from "./SpeedSearchContainer";

interface Props extends SpeedSearchStateProps {
  children: React.ReactNode;
  stickySearch?: boolean;
  className?: string;
  containerProps?: Omit<HTMLProps<HTMLDivElement>, "as" | "ref">;
}

// Maybe no need for this component, now that almost everything is moved to hooks, and a couple of
// styled components. Then useSpeedSearchState can also be moved to useSpeedSearch
export function SpeedSearch({
  children,
  stickySearch = false,
  className,
  containerProps = {},
  ...otherProps
}: Props) {
  const speedSearchState = useSpeedSearchState(otherProps);
  const { containerProps: speedSearchContainerProps } = useSpeedSearch(
    { stickySearch },
    speedSearchState
  );

  return (
    <SpeedSearchContainer
      {...mergeProps(containerProps, speedSearchContainerProps, { className })}
    >
      <SpeedSearchPopup active={speedSearchState.active}>
        {speedSearchState.searchTerm}
      </SpeedSearchPopup>
      {children}
    </SpeedSearchContainer>
  );
}
