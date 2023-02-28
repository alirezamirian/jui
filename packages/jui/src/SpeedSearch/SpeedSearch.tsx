import { mergeProps, useObjectRef } from "@react-aria/utils";
import React, { ForwardedRef, HTMLProps } from "react";
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
  match?: boolean;
  className?: string;
  containerProps?: Omit<HTMLProps<HTMLDivElement>, "as" | "ref">;
}

// Maybe no need for this component, now that almost everything is moved to hooks, and a couple of
// styled components. Then useSpeedSearchState can also be moved to useSpeedSearch
export const SpeedSearch = React.forwardRef(function SpeedSearch(
  {
    children,
    stickySearch = false,
    className,
    containerProps = {},
    match,
    ...otherProps
  }: Props,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const ref = useObjectRef(forwardedRef);
  const speedSearchState = useSpeedSearchState(otherProps);
  const { containerProps: speedSearchContainerProps } = useSpeedSearch(
    { stickySearch },
    speedSearchState,
    ref
  );

  return (
    <SpeedSearchContainer
      /* We might as well use useFocusable. The return type was troublesome in the first try. */
      tabIndex={-1}
      ref={ref}
      {...mergeProps(containerProps, speedSearchContainerProps, { className })}
    >
      <SpeedSearchPopup active={speedSearchState.active} match={match}>
        {speedSearchState.searchTerm}
      </SpeedSearchPopup>
      {children}
    </SpeedSearchContainer>
  );
});
