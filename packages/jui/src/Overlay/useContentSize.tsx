import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { useDebouncedCallback } from "@intellij-platform/core/utils/useDebounce";

/**
 * Clones the element, applies the temporary styles, and calls {@param fn} on the clone.
 * Previously, we applied the temporary styles on the element itself, run fn, and then revert to previous styles,
 * but that can mess with the scroll bar in the content. If there is a scrollable part in some nested element,
 * applying temporary style (in our case width: fit-content, height: fit-content) can cause scroll to jump which is not
 * restored after the style reversion. Now the approach is changed to apply the temporary styles on a temporary clone
 * of the element. It's certainly not as efficient and some optimization may be needed.
 * @param style: temporary styles to apply before fn is invoked, and revert after.
 * @param fn the function to compute something on the element with temporary styles
 */
const withTemporaryStyle =
  <T extends any>(
    style: Partial<CSSStyleDeclaration>,
    fn: (element: HTMLElement) => T
  ) =>
  (element: HTMLElement): T => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    Object.assign(clone.style, style);
    const returnValue = fn(clone);

    document.body.removeChild(clone);
    return returnValue;
  };

/**
 * FIXME: withTemporaryStyle is not side-effect free and can cause scroll jumps. It creates awfully hard-to-debug
 *  issues.
 */
export const getContentSize = withTemporaryStyle(
  {
    width: "",
    minWidth: "fit-content", // Shouldn't it be min-content? :-?
    height: "",
    minHeight: "fit-content",
  },
  (element) => ({
    width: Math.ceil(parseFloat(getComputedStyle(element).width)),
    height: Math.ceil(parseFloat(getComputedStyle(element).height)),
  })
);

export const useContentSize = (
  ref: RefObject<HTMLElement>,
  {
    observe = false,
  }: {
    /**
     * if false, the content size is measured only initially. If true, the dom changes are observed, and content size
     * is updated accordingly.
     * @default false
     */
    observe?: boolean;
  } = {}
) => {
  const [measuredSizes, setMeasuredSizes] = useState<Size[]>([]);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || measuredSizes.length > 5) {
      return;
    }
    const size = getContentSize(element);

    const lastMeasuredSize = measuredSizes.at(-1);
    if (!lastMeasuredSize || !Size.isEqual(lastMeasuredSize, size)) {
      setMeasuredSizes([size]);
    }
    const id = window.requestAnimationFrame(() => {
      const newSize = getContentSize(element);
      if (!Size.isEqual(newSize, size)) {
        setMeasuredSizes([...measuredSizes, newSize]);
      }
    });
    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [
    measuredSizes,
    // ref value shouldn't normally be an effect's dependency, but for some reason, ref value is null in the first call
    // when built for website. Interestingly, it doesn't happen in storybook. So maybe something to investigate further
    ref.current,
  ]);
  const measure = () => {
    const lastMeasuredSize = measuredSizes.at(-1);
    if (ref.current && lastMeasuredSize) {
      const currentSize = getContentSize(ref.current);
      if (
        currentSize.height !== lastMeasuredSize.height ||
        currentSize.width !== lastMeasuredSize.width
      ) {
        setMeasuredSizes(
          measuredSizes.map((aSize) =>
            aSize === lastMeasuredSize ? currentSize : aSize
          )
        );
      }
    }
  };
  const debouncedMeasure = useDebouncedCallback(measure);

  useEffect(() => {
    const element = ref.current;
    if (observe && element) {
      const mutationObserver = new MutationObserver(() => {
        debouncedMeasure();
      });
      mutationObserver.observe(element, {
        subtree: true,
        childList: true,
      });
      return () => {
        mutationObserver.disconnect();
      };
    }
  }, [
    observe,
    // ref value shouldn't normally be an effect's dependency, but for some reason, ref value is null in the first call
    // when built for website. Interestingly, it doesn't happen in storybook. So maybe something to investigate further
    ref.current,
  ]);
  return [measuredSizes.at(-1) || { width: 0, height: 0 }, measure] as const;
};

interface Size {
  width: number;
  height: number;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Size = {
  isEqual: (
    { width, height }: Size,
    { width: width2, height: height2 }: { width: number; height: number }
  ) => width === width2 && height === height2,
};
