import { RefObject, useLayoutEffect, useState } from "react";

const withTemporaryStyle =
  <T extends any>(
    style: Partial<CSSStyleDeclaration>,
    fn: (element: HTMLElement) => T
  ) =>
  (element: HTMLElement): T => {
    const currentStyles = Object.keys(style).reduce((currentStyles, key) => {
      return {
        ...currentStyles,
        [key]: element.style[key as keyof CSSStyleDeclaration],
      };
    }, {} as CSSStyleDeclaration);

    Object.assign(element.style, style);
    const returnValue = fn(element);
    Object.assign(element.style, currentStyles);
    return returnValue;
  };

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

export const useContentSize = (ref: RefObject<HTMLElement>) => {
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
    const id = window.requestIdleCallback(() => {
      const newSize = getContentSize(element);
      if (!Size.isEqual(newSize, size)) {
        setMeasuredSizes([...measuredSizes, newSize]);
      }
    });
    return () => {
      window.cancelIdleCallback(id);
    };
  }, [measuredSizes]);
  const measure = () => {
    if (ref.current) {
      setMeasuredSizes([]); // or should we set to last measured size?
    }
  };
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
