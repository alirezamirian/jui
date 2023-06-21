import React, { useContext, useRef } from "react";
import { Overlay as AriaOverlay, OverlayProps } from "@react-aria/overlays";

const ParentOverlayContext = React.createContext<HTMLElement | null>(null);

/**
 * A (drop-in replacement) wrapper around Overlay, which makes sure overlays created in nested
 * react components will be ported to the same top level container. This is especially useful to detect
 * "outside clicks" when overlays are nested. The most common example would be nested menu in popup.
 *
 */
export function Overlay({
  children,
  OverlayComponent = AriaOverlay,
}: {
  children: React.ReactNode;
  OverlayComponent?: React.ComponentType<OverlayProps>;
}) {
  const root = useContext(ParentOverlayContext);
  const containerRef = useRef<HTMLDivElement>(null);

  if (root) {
    return (
      <OverlayComponent portalContainer={root}>{children}</OverlayComponent>
    );
  }
  return (
    <ParentOverlayContext.Provider value={containerRef.current}>
      <OverlayComponent>
        <div ref={containerRef} data-overlay-root="">
          {children}
        </div>
      </OverlayComponent>
    </ParentOverlayContext.Provider>
  );
}

/**
 * Returns true, if element1 and element2 are in nested overlays. "Nested" being in terms of React component tree.
 * Useful for detecting "outside click" when overlay components are nested in each other.
 */
export function areInNestedOverlays(
  element1: Element | null,
  element2: Element | null
) {
  const overlayRoot1 = element1?.closest("[data-overlay-root]");
  const overlayRoot2 = element2?.closest("[data-overlay-root]");
  return Boolean(overlayRoot1) && overlayRoot1 === overlayRoot2;
}
