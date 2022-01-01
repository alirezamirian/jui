import { RefObject, UIEventHandler, useEffect, useState } from "react";

export function useIsScrolled<T extends HTMLElement>({
  threshold = 5,
  ref,
}: {
  threshold?: number;
  ref: RefObject<T>;
}) {
  const [isScrolled, setIsScrolled] = useState({
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
      const newIsScrolled = {
        top: offsetTop >= threshold,
        bottom: offsetBottom >= threshold,
        left: offsetLeft >= threshold,
        right: offsetRight >= threshold,
      };
      if (
        isScrolled.top !== isScrolled.top ||
        isScrolled.bottom !== newIsScrolled.bottom ||
        isScrolled.left !== newIsScrolled.left ||
        isScrolled.right !== newIsScrolled.right
      ) {
        setIsScrolled(newIsScrolled);
      }
    }
  };
  useEffect(update);

  return {
    scrolledIndicatorProps: {
      onScroll: update as UIEventHandler<T>,
    },
    isScrolled,
  };
}
