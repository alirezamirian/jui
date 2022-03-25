import React, {
  CSSProperties,
  HTMLAttributes,
  Ref,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { keyframes } from "styled-components";
import { useProgressBar } from "@react-aria/progress";
import { AriaProgressBarProps } from "@react-types/progress";
import { PressProps, useHover } from "@react-aria/interactions";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";

import { Theme } from "@intellij-platform/core/Theme";
import { css, styled } from "@intellij-platform/core/styled";

export interface ProgressBarProps extends Omit<AriaProgressBarProps, "label"> {
  /**
   * Process name, shown above or to the left of the progress bar. Placement is controlled by {@link namePosition}.
   * @see https://jetbrains.github.io/ui/controls/progress_bar/#process-name
   */
  name?: React.ReactNode;

  /**
   * Process name position with respect to the progress bar.
   * If `namePosition` is "side", {@link name} is **not** automatically appended with a colon.
   * @default "top"
   */
  namePosition?: "side" | "top";

  /**
   * Process details, placed bellow the progress bar, with a de-emphasized color.
   * @see https://jetbrains.github.io/ui/controls/progress_bar/#process-details
   */
  details?: React.ReactNode;

  /**
   * A second line of details. Not an officially documented feature, but it's supported in the reference impl.
   */
  secondaryDetails?: React.ReactNode;

  /**
   * Placed next to and aligned with the progress bar, used for
   * [process control](https://jetbrains.github.io/ui/controls/progress_bar/#process-control) buttons.
   */
  button?: React.ReactNode;

  /**
   * Progress bar track width.
   */
  width?: CSSProperties["width"];

  /**
   * Not supported in [the official specs](https://jetbrains.github.io/ui/controls/progress_bar/#25), but the progress
   * bar in status bar has a denser spacing. It still won't be a pixel perfect match with the progress bar in the
   * status bar.
   */
  dense?: boolean;

  style?: HTMLAttributes<unknown>["style"];
  className?: HTMLAttributes<unknown>["className"];
}

interface ProgressBarContextObj {
  setForcedDetails: (details: string | null) => void;
  setTooltip: (tooltip: string | null) => void;
}

/**
 * @see https://jetbrains.github.io/ui/controls/progress_bar/
 * @see https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/platform-api/src/com/intellij/openapi/ui/panel/ProgressPanelBuilder.java
 *
 * Known issues:
 * There are a couple of UI issues because of the current layout (which can be improved probably):
 * - max-width of the label and details, it's not necessarily aligned with the the progressbar track, because they don't
 *   share the same container
 * - when label is on the side, details is aligned with the label, instead of the progressbar track.
 */
export const ProgressBar = ({
  value = 0,
  maxValue = 100,
  minValue = 0,
  name,
  namePosition = "top",
  details,
  secondaryDetails,
  button,
  width,
  dense,
  className,
  style,
  ...props
}: ProgressBarProps): React.ReactElement => {
  const { progressBarProps, labelProps } = useProgressBar({
    ...props,
    label: name,
    value,
    maxValue,
    minValue,
  });
  const percentage = (100 * (value / maxValue)).toFixed(0);
  const [forcedDetails, setForcedDetails] = useState<null | string>("");
  const [tooltip, setTooltip] = useState<null | string>("");

  const contextValue: ProgressBarContextObj = useMemo(
    () => ({
      setForcedDetails,
      setTooltip,
    }),
    []
  );
  const label = (
    <StyledProgressBarLabel {...labelProps}>{name}</StyledProgressBarLabel>
  );
  const effectiveDetails = details ? tooltip || forcedDetails || details : null;
  return (
    <StyledProgressBarContainer style={style} className={className}>
      {namePosition === "top" && label}
      <StyledProgressBarLineContainer
        dense={dense}
        hasTopMargin={Boolean(name) && namePosition === "top"}
        hasBottomMargin={Boolean(effectiveDetails)}
      >
        {namePosition === "side" && label}
        <StyledProgressBarTrack
          style={{ width }}
          {...progressBarProps}
          indeterminate={props.isIndeterminate}
        >
          {!props.isIndeterminate && (
            <StyledProgressBarProgress style={{ width: `${percentage}%` }} />
          )}
        </StyledProgressBarTrack>
        {props.showValueLabel && (
          <span>{props.valueLabel ?? `${percentage}%`}</span>
        )}
        <ProgressBarContext.Provider value={contextValue}>
          {button}
        </ProgressBarContext.Provider>
      </StyledProgressBarLineContainer>
      <StyledProgressBarDetails>{effectiveDetails}</StyledProgressBarDetails>
      <StyledProgressBarDetails>{secondaryDetails}</StyledProgressBarDetails>
    </StyledProgressBarContainer>
  );
};

const ProgressBarContext = React.createContext<null | ProgressBarContextObj>(
  null
);

const StyledProgressBarContainer = styled.div`
  color: ${({ theme }) => theme.commonColors.labelForeground /* TODO: check*/};
  cursor: default; // prevent cursor on text
`;

const StyledProgressBarLineContainer = styled.div<{
  dense?: boolean;
  hasTopMargin?: boolean;
  hasBottomMargin?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${({ dense }) => (dense ? "0.5rem" : "0.625rem")};
  height: 4px;
  // spacing is based on the reference impl and figma designs. top and bottom spacing is inverted in the spec document
  // figma: https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-(Community)?node-id=75426%3A16650
  // spec document: https://jetbrains.github.io/ui/controls/progress_bar/#25
  margin-top: ${({ hasTopMargin }) => hasTopMargin && "0.375rem"};
  margin-bottom: ${({ hasBottomMargin }) => hasBottomMargin && "0.25rem"};
`;

const StyledProgressBarLabel = styled.div`
  white-space: nowrap;
  max-width: calc(100% - 2rem);
  overflow: hidden;
`;

const StyledProgressBarDetails = styled.div`
  color: ${({ theme }) => theme.commonColors.contextHelpForeground};
  font-size: 0.82em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 2rem); // not the best way
`;

const StyledProgressBarTrack = styled.div<{ indeterminate?: boolean }>`
  height: inherit;
  border-radius: 2px;
  overflow: hidden;
  display: flex;

  // In case used in flex layout
  min-width: 0;
  flex: 1;

  background: ${({ theme }) =>
    theme.color(
      "ProgressBar.trackColor",
      theme.dark ? "rgb(85,85,85)" : "rgb(196,196,196)"
    )};
  ${({ indeterminate }) =>
    indeterminate &&
    css`
      background: linear-gradient(
        90deg,
        ${getIndeterminateStartColor} 0%,
        ${getIndeterminateEndColor} 50%,
        ${getIndeterminateStartColor} 100%
      );
      background-size: 96px auto;
      animation: 800ms ${indeterminateBackgroundAnimation} linear infinite;
    `}
`;

const getIndeterminateStartColor = ({ theme }: { theme: Theme }) =>
  theme.color("ProgressBar.indeterminateStartColor");
const getIndeterminateEndColor = ({ theme }: { theme: Theme }) =>
  theme.color("ProgressBar.indeterminateEndColor");

const indeterminateBackgroundAnimation = keyframes`
  0% {
    background-position: 0;
  }
  100% {
    background-position: 96px;
  }
`;

const StyledProgressBarProgress = styled.div`
  height: 100%;
  background: ${({ theme }) =>
    theme.color(
      "ProgressBar.progressColor",
      theme.dark ? "rgb(160,160,160)" : "rgb(128,128,128)"
    )};
`;

type ProgressBarIconButtonProps = Pick<PressProps, "onPress"> & {
  hoverTooltip: string;
};

/**
 * Accessibility and functionality of progress bar icon buttons
 * @private maybe?
 */
export function useProgressBarIconButton(
  { onPress, hoverTooltip }: ProgressBarIconButtonProps,
  ref: Ref<HTMLElement>
) {
  const { buttonProps } = useButton(
    {
      onPress,
      elementType: "span",
      excludeFromTabOrder: true,
      // @ts-expect-error: it works, but it's intentionally excluded from the type.
      preventFocusOnPress: true,
    },
    ref
  );
  const context = useContext(ProgressBarContext);
  const { hoverProps, isHovered } = useHover({});
  useEffect(() => {
    context?.setTooltip(isHovered ? hoverTooltip : null);
  }, [hoverTooltip, isHovered]);
  return {
    buttonProps: mergeProps(buttonProps, hoverProps),
  };
}

/**
 * @private maybe?
 * */
export function useProgressBarPauseIconButton(
  { paused, ...props }: ProgressBarIconButtonProps & { paused: boolean },
  ref: Ref<HTMLElement>
) {
  const context = useContext(ProgressBarContext);
  useEffect(() => {
    context?.setForcedDetails(paused ? "Paused" : null);
  }, [paused]);
  return useProgressBarIconButton(props, ref);
}
