import { notNull } from "@intellij-platform/core/utils/array-utils";

export interface OverflowObserverRecord {
  target: Element;
  overflowedElements: Element[];
  previouslyOverflowedElements: Element[];
}

export type OverflowObserverCallback = (
  change: OverflowObserverRecord,
  observer: OverflowObserver
) => void;

/**
 * Allows observing the list of overflowing children of a given target element.
 * An `IntersectionObserver` is created for each target to observe the intersection between the target and each child
 * element. The child elements are observed/unobserved by the intersection observer as they are added/removed to the
 * DOM, which is observed using a `MutationObserver`.
 * `IntersectionObserver` options such as `rootMargin` are supported, to fine tune what should be considered as
 * overflowed.
 *
 * TODO: add a takeRecords method to allow processing pending mutations before disconnect
 * TODO: maybe add direction option?
 *
 */
export class OverflowObserver {
  private mutationObserver: MutationObserver;
  private data: Map<
    Element,
    {
      intersectionObserver: IntersectionObserver;
      currentOverflowElements: Element[];
    }
  > = new Map();

  constructor(private callback: OverflowObserverCallback) {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target;
        if (!(target instanceof Element)) {
          return;
        }
        mutation.removedNodes.forEach((node) => {
          if (node instanceof Element) {
            this.data.get(target)?.intersectionObserver.unobserve(node);
          }
        });
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            this.data.get(target)?.intersectionObserver.observe(node);
          }
        });
      });
    });
  }

  observe(target: Element, options: Omit<IntersectionObserverInit, "root">) {
    this.data.get(target)?.intersectionObserver.disconnect();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const data = this.data.get(target);
        const newHiddenElements = entries
          .map((entry) =>
            !entry.isIntersecting && entry.target instanceof Element
              ? entry.target
              : undefined
          )
          .filter(notNull);
        const newVisibleElements = entries
          .map((entry) =>
            entry.isIntersecting && entry.target instanceof Element
              ? entry.target
              : null
          )
          .filter(notNull);

        //  Also cover this in Toolbar with a test case
        const previouslyOverflowedElements =
          data?.currentOverflowElements || [];
        const overflowedElements = previouslyOverflowedElements
          .filter((element) => !newVisibleElements.includes(element))
          .concat(newHiddenElements)
          .filter((element) => {
            // In some cases some elements may be hidden by some styles (e.g. the first/last separator in a toolbar).
            // It doesn't make sense to report them as overflowed.
            const isHidden =
              element instanceof HTMLElement &&
              element.offsetWidth === 0 &&
              element.offsetHeight === 0;
            return !isHidden;
          });
        this.callback(
          {
            previouslyOverflowedElements,
            overflowedElements: overflowedElements,
            target,
          },
          this
        );
        if (data) {
          data.currentOverflowElements = overflowedElements;
        }
      },
      {
        ...options,
        root: target,
      }
    );
    [...(target?.children || [])].forEach((childElement) => {
      intersectionObserver.observe(childElement);
    });
    this.data.set(target, {
      intersectionObserver,
      currentOverflowElements: [],
    });
    this.mutationObserver.observe(target, {
      childList: true,
    });
  }

  unobserve(target: Element) {
    this.data.get(target)?.intersectionObserver.disconnect();
  }

  disconnect() {
    [...this.data.values()].forEach(({ intersectionObserver }) =>
      intersectionObserver.disconnect()
    );
    this.data = new Map();
    this.mutationObserver.disconnect();
  }
}
