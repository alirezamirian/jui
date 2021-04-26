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
  containerProps: Omit<HTMLProps<HTMLDivElement>, "as">;
}

// Maybe no need for this component, now that almost everything is moved to hooks, and a couple of
// styled components. Then useSpeedSearchState can also be moved to useSpeedSearch
export function SpeedSearch({
  children,
  stickySearch = false,
  containerProps,
  ...otherProps
}: Props) {
  const { searchTerm, active } = otherProps;
  const speedSearchState = useSpeedSearchState(otherProps);
  const { containerProps: speedSearchContainerProps } = useSpeedSearch(
    { stickySearch },
    speedSearchState
  );

  return (
    <SpeedSearchContainer
      {...mergeProps(containerProps, speedSearchContainerProps)}
    >
      <SpeedSearchPopup active={active}>{searchTerm}</SpeedSearchPopup>
      {children}
    </SpeedSearchContainer>
  );
}
