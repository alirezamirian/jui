import { mergeProps } from "@react-aria/utils";
import React, { HTMLProps } from "react";
import { SpeedSearchContainer } from "./SpeedSearchContainer";
import { SpeedSearchPopup } from "./SpeedSearchPopup";
import {
  SpeedSearchStateProps,
  useSpeedSearch,
  useSpeedSearchState,
} from "./useSpeedSearch";

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
      /* We might as well use useFocusable. The return type was troublesome in the first try. */
      tabIndex={-1}
      {...mergeProps(containerProps, speedSearchContainerProps, { className })}
    >
      <SpeedSearchPopup active={speedSearchState.active}>
        {speedSearchState.searchTerm}
      </SpeedSearchPopup>
      {children}
    </SpeedSearchContainer>
  );
}
