import React, { useContext, useEffect, useRef, useState } from "react";
import { IconProps } from "@intellij-platform/core/Icon/IconProps";
import {
  AutoHoverPlatformIcon,
  PlatformIcon,
} from "@intellij-platform/core/Icon";
import { ControlledStateProps } from "@intellij-platform/core/type-utils";
import { useControlledState } from "@react-stately/utils";
import {
  StyledBalloonBody,
  StyledBalloonContainer,
  StyledBalloonFooter,
  StyledBalloonHeader,
  StyledHeaderActions,
  StyledIconContainer,
  StyledToggleExpandButtonContainer,
  StyledToggleExpandButtonFooterContainer,
  StyledToggleIconContainer,
} from "@intellij-platform/core/Balloon/Balloon.styled";
import { DOMProps } from "@react-types/shared";
import { Link } from "@intellij-platform/core/Link";

export type BalloonProps = ControlledStateProps<{ expanded: boolean }> &
  DOMProps & {
    /**
     * Icon rendered in the top left
     */
    icon?: "Info" | "Warning" | "Error" | React.ReactElement<IconProps>;
    /**
     * Rendered beside close button. Can be used for rendering a "notification settings" icon button.
     */
    headerActions?: React.ReactNode;
    /**
     * Called when the close button is clicked. If not passed, close button will not be rendered.
     */
    onClose?: () => void;
    /**
     * Actions rendered in the footer.
     */
    actions?: React.ReactNode;
  } & (
    | {
        title?: React.ReactNode;
        body: React.ReactNode;
      }
    | {
        title: React.ReactNode;
        body?: React.ReactNode;
      }
  );

type BalloonContextObj = {
  onClose?: () => void;
};
const BalloonContext = React.createContext<BalloonContextObj | null>(null);

/**
 * A tiny wrapper around {@link Link} component, to be used for actions in Balloon.
 * It closes the balloon when pressed.
 */
export const BalloonActionLink: typeof Link = React.forwardRef(
  ({ onPress, ...props }, ref) => {
    const context = useContext(BalloonContext);
    if (context === null) {
      throw new Error(
        "BalloonActionLink should only be rendered inside Balloon notifications"
      );
    }
    return (
      <Link
        ref={ref}
        {...props}
        onPress={(...args) => {
          context?.onClose?.();
          return onPress?.(...args);
        }}
      />
    );
  }
);
/**
 * [Balloon notification](https://jetbrains.github.io/ui/controls/balloon/) UI.
 *
 * Notes and TODO:
 * - Add support for "error" variant: https://github.com/JetBrains/intellij-community/blob/48c024fcd38bd8d1eccdada05489a8952a494270/platform/platform-impl/src/com/intellij/diagnostic/IdeMessagePanel.java#L215
 * - Add support for timeout. Although if the auto close behaviour is only timeout-based, maybe there is not much value in adding a prop for it and calling onClose on timeout.
 * - BalloonActions component to be used for rendering a bunch of links in the actions. It should encapsulate the
 *   behaviour of moving actions into a menu when there is not enough room.
 */
export const Balloon = ({
  icon: iconProp = "Info",
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  title,
  headerActions,
  onClose,
  body,
  actions,
  ...containerProps
}: BalloonProps): React.ReactElement => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [expandable, setExpandable] = useState(false);
  const [expanded, setExpanded] = useControlledState(
    expandedProp!,
    defaultExpanded,
    onExpandedChange!
  );
  const maxLinesWhenNotExpanded = 1 + (title ? 0 : 1) + (actions ? 0 : 1);

  useEffect(() => {
    const bodyElem = bodyRef.current;
    if (bodyElem) {
      setExpandable(
        expanded
          ? getNumLines(bodyElem) > maxLinesWhenNotExpanded
          : bodyElem.scrollHeight > bodyElem.clientHeight
      );
    } else {
      setExpandable(false);
    }
  }, [expanded]);
  const validIconTypes = ["Error", "Warning", "Info"] as const;
  const icon =
    typeof iconProp === "string" ? (
      <PlatformIcon
        icon={`general/notification${validIconTypes.find(
          (iconType, index, arr) =>
            iconType === iconProp || index === arr.length - 1
        )}.svg`}
      />
    ) : (
      iconProp
    );
  // @ts-expect-error support for callback updater is removed from useControlledState. https://github.com/adobe/react-spectrum/issues/2320
  const toggle = () => setExpanded((expanded) => !expanded);

  const effectiveExpanded = expanded && Boolean(body);

  return (
    <BalloonContext.Provider value={{ onClose }}>
      <StyledBalloonContainer data-testid="balloon" {...containerProps}>
        <StyledIconContainer>{icon}</StyledIconContainer>
        {title && <StyledBalloonHeader>{title}</StyledBalloonHeader>}
        <StyledHeaderActions>
          {headerActions}
          {onClose && (
            <AutoHoverPlatformIcon
              icon="ide/notification/close.svg"
              onClick={onClose}
              role="button"
              data-testid="close-btn"
              style={{ marginLeft: "0.75rem" }}
            />
          )}
        </StyledHeaderActions>
        {body && (
          <ToggleWrapper
            expanded={effectiveExpanded}
            enabled={expandable && !effectiveExpanded}
            onToggle={toggle}
          >
            <StyledBalloonBody
              lineClamp={!effectiveExpanded && maxLinesWhenNotExpanded}
              ref={bodyRef}
            >
              {body}
            </StyledBalloonBody>
          </ToggleWrapper>
        )}
        <ToggleWrapper
          expanded={effectiveExpanded}
          enabled={expandable && effectiveExpanded}
          onToggle={toggle}
          Component={StyledToggleExpandButtonFooterContainer}
        >
          {actions && (
            <StyledBalloonFooter onClick={(e) => e.stopPropagation()}>
              {actions}
            </StyledBalloonFooter>
          )}
        </ToggleWrapper>
      </StyledBalloonContainer>
    </BalloonContext.Provider>
  );
};

/**
 * If enabled wraps its children in a clickable area (with the expand/collapse arrow),f for toggling expanded state.
 */
const ToggleWrapper: React.FC<{
  enabled: boolean;
  expanded: boolean;
  Component?: typeof StyledToggleExpandButtonContainer;
  onToggle: () => void;
}> = ({
  children,
  onToggle,
  expanded,
  enabled,
  Component = StyledToggleExpandButtonContainer,
}) => {
  const iconName = expanded ? "collapse" : "expand";
  const toggleIcon = (
    <StyledToggleIconContainer>
      <AutoHoverPlatformIcon
        icon={`ide/notification/${iconName}.svg`}
        className="icon"
      />
    </StyledToggleIconContainer>
  );

  return enabled ? (
    <Component
      onClick={onToggle}
      role="button"
      data-testid={`${expanded ? "collapse" : "expand"}-btn`}
    >
      {children}
      {toggleIcon}
    </Component>
  ) : (
    <>{children}</>
  );
};

/**
 * Based on the computed line-height and clientHeight of the element, returns the number of lines of the content.
 */
function getNumLines(bodyElem: Element) {
  return (
    bodyElem.clientHeight / parseFloat(getComputedStyle(bodyElem).lineHeight)
  );
}
