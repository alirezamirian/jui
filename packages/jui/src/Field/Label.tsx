import { styled } from "@intellij-platform/core/styled";
import React, {
  ForwardedRef,
  forwardRef,
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { DOMAttributes } from "@react-types/shared";

export type LabelPlacement = "above" | "before";

const StyledLabelContainer = styled.div<{
  labelPlacement?: LabelPlacement;
}>`
  display: inline-flex;
  flex-direction: ${({ labelPlacement }) =>
    labelPlacement === "above" ? "column" : "row"};
  align-items: start;
  gap: 0.375rem;
`;

const StyledLabel = styled.label<{ isDisabled?: boolean }>`
  color: ${({ theme, isDisabled: disabled }) =>
    theme.commonColors.label({ disabled })};
  margin-top: 0.25rem;
  line-height: 1.2;
`;

/**
 * Implements [label](https://jetbrains.github.io/ui/controls/input_field/#label),
 * for elements like Input, Dropdown, etc.
 */
export const WithLabel = forwardRef(function WithLabel(
  {
    label,
    labelPlacement,
    labelProps,
    children,
    isDisabled,
    ...props
  }: {
    isDisabled: boolean | undefined;
    label: React.ReactNode;
    labelPlacement: LabelPlacement | undefined /* intentionally not optional */;
    labelProps?: DOMAttributes;
  } & DOMAttributes,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const labelRef = React.useRef<HTMLLabelElement>(null);
  useAlignedLabels({ ref: labelRef, enabled: labelPlacement !== "above" });
  return (
    <StyledLabelContainer
      {...props}
      labelPlacement={labelPlacement}
      ref={forwardedRef}
    >
      {label && (
        <StyledLabel {...labelProps} isDisabled={isDisabled} ref={labelRef}>
          {label}
        </StyledLabel>
      )}
      {children}
    </StyledLabelContainer>
  );
});

function useAlignedLabels({
  ref,
  enabled,
}: {
  ref: RefObject<HTMLElement>;
  enabled?: boolean;
}) {
  const { applyLabelWidth, commonWidth } = useContext(LabelAlignmentContext);
  useLayoutEffect(() => {
    const apply = (): boolean => {
      const width = ref.current?.offsetWidth;
      if (width) {
        applyLabelWidth(width);
        return true;
      }
      return false;
    };
    // In some situations, the width is zero in the first render.
    if (!apply()) {
      setTimeout(apply, 0);
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.style.width =
        commonWidth && enabled ? `${commonWidth}px` : "";
    }
  }, [commonWidth, enabled]);
}

const LabelAlignmentContext = React.createContext<{
  commonWidth: number | null;
  applyLabelWidth: (width: number) => void;
}>({ commonWidth: null, applyLabelWidth: () => {} });

/**
 * Provides a context for
 * [labeled input controls](https://jetbrains.github.io/ui/principles/layout/#labeled-input-controls)
 * with side-positioned labels to have their input boxes aligned.
 * It doesn't render anything in DOM and only provides a context used
 * by labeled controls to set a common width on labels so that the input boxes
 * align.
 * Labeled input controls are:
 * - {@link InputField}
 * - {@link ComboBox}
 * - {@link Dropdown}
 */
export function LabeledControlsAlignmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commonWidth, setCommonWidth] = React.useState<null | number>(null);

  const applyLabelWidth = (width: number) => {
    setCommonWidth((currentWidth) =>
      width > (currentWidth ?? 0)
        ? width + 1 /* without 1px it wraps in some cases ¯\_(ツ)_/¯ */
        : currentWidth
    );
  };
  return (
    <LabelAlignmentContext.Provider value={{ commonWidth, applyLabelWidth }}>
      {children}
    </LabelAlignmentContext.Provider>
  );
}
