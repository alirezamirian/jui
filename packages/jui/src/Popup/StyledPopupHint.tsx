import { styled } from "@intellij-platform/core/styled";

/**
 * Hint component (aka Advertiser) used in Popup's footer.
 * {@see Popup.Layout}
 */
export const StyledPopupHint = styled.div`
  // NOTE: Following the reference implementation, would require to set fallback colors non-prior to
  // *.(background|foreground) colors (by not passing the fallback color as the second argument to theme.color).
  // It's only in BigPopup that the fallback colors are prioritized over *-fallback. But in Figma designs, this is
  // simplified, and hint always has the muted color (like in BigPopup), instead of the default foreground.
  // So we are intentionally deviating from the reference implementation here.
  background: ${({ theme }) =>
    theme.color(
      "Popup.Advertiser.background",
      theme.color("SearchEverywhere.Advertiser.background")
    )};
  color: ${({ theme }) =>
    theme.color(
      "Popup.Advertiser.foreground",
      theme.color("SearchEverywhere.Advertiser.foreground")
    )};
  padding: 0.3125rem 0.9375rem 0.3125rem 0.625rem;
  font-size: 0.875em;
  line-height: normal;
  user-select: none;
  cursor: default;
  // NOTE: white-space is intentionally not set as nowrap.
`;
