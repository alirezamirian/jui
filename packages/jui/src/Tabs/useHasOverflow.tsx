import { RefObject, UIEventHandler, useEffect, useState } from "react";

export function useHasOverflow<T extends HTMLElement>({
  threshold = 5,
  ref,
}: {
  threshold?: number;
  ref: RefObject<T>;
}) {
  const [hasOverflow, setHasOverflow] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const update = () => {
    const element = ref.current;
    if (element) {
      const offsetLeft = element.scrollLeft;
      const offsetRight =
        element.scrollWidth - (element.offsetWidth + element.scrollLeft);
      const offsetTop = element.scrollTop;
      const offsetBottom =
        element.scrollHeight - (element.offsetHeight + element.scrollTop);
      const newHasOverflow = {
        top: offsetTop >= threshold,
        bottom: offsetBottom >= threshold,
        left: offsetLeft >= threshold,
        right: offsetRight >= threshold,
      };
      if (
        hasOverflow.top !== newHasOverflow.top ||
        hasOverflow.bottom !== newHasOverflow.bottom ||
        hasOverflow.left !== newHasOverflow.left ||
        hasOverflow.right !== newHasOverflow.right
      ) {
        setHasOverflow(newHasOverflow);
      }
    }
  };
  useEffect(update);

  return {
    scrolledIndicatorProps: {
      onScroll: update as UIEventHandler<T>,
    },
    hasOverflow,
  };
}
