import React, { useEffect, useRef, useState } from "react";
import { RecoilState, useRecoilCallback, useSetRecoilState } from "recoil";
import { Bounds, Popup, PopupProps } from "@intellij-platform/core";

/**
 * A special type of popup, where the content can be toggled on and off. Needed only for SearchEveryWhere at the moment,
 * but extracted as a component, to collocate related pieces, rather than leave them with the rest of the code in the
 * component.
 * - Updates persisted {@param boundsState}, when the bounds are changed, only if the content is shown when the bounds
 *   is changed.
 * - Minimizes the popup into {@param noContentHeight}, when {@param hasContent} is `false`.
 * - Restores the popup height to it's latest value, or based on content, when {@param hasContent} changes to `true`.
 * - Returns the right to be applied based on the input {@param minHeight} and {@param hasContent}.
 */
export function ContentAwarePopup({
  hasContent,
  persistedBoundsState,
  noContentHeight,
  minHeight,
  ...otherProps
}: {
  /**
   * Whether the popup has content. If `false`, the popup is minimized to `noContentHeight`.
   */
  hasContent: boolean;
  /**
   * The minimized height of the popup, when there is no content.
   */
  noContentHeight: number;
  /**
   * Persisted state of the popup bounds, in form of a recoil state.
   */
  persistedBoundsState: RecoilState<Partial<Bounds> | null>;
} & Omit<PopupProps, "bounds" | "onBoundsChange">) {
  const persistBounds = useSetRecoilState(persistedBoundsState);
  const getInitBounds = useRecoilCallback(
    ({ snapshot }) =>
      () =>
        snapshot.getLoadable(persistedBoundsState).getValue() || {
          top: 150,
          height: Math.max(200, window.innerHeight - 300),
        },
    []
  );

  const [bounds, setBounds] = useState<Partial<Bounds>>(getInitBounds);
  const heightToRestoreRef = useRef(bounds.height);
  const onBoundsChange = (bounds: Bounds) => {
    if (hasContent) {
      heightToRestoreRef.current = bounds.height;
      persistBounds(bounds);
    }
    setBounds(bounds);
  };
  useEffect(() => {
    setBounds((bounds) => ({
      ...bounds,
      height: hasContent ? heightToRestoreRef.current : noContentHeight,
    }));
  }, [hasContent]);

  return (
    <Popup
      {...otherProps}
      bounds={bounds}
      onBoundsChange={onBoundsChange}
      minHeight={!hasContent ? noContentHeight : minHeight}
    />
  );
}
