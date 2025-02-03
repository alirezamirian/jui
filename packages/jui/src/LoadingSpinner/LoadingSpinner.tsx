import React, { SVGProps } from "react";

export interface LoadingSpinnerProps
  extends Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height"> {
  /**
   * Loading spinner size in pixels
   * @default {@link LOADING_SPINNER_SIZE_BIG}
   */
  size?: number;
}

export const LOADING_SPINNER_SIZE_SMALL = 16;
export const LOADING_SPINNER_SIZE_BIG = 32;
/**
 * Aka AsyncProcessIcon in Intellij Platform source.
 */
export function LoadingSpinner({
  size = LOADING_SPINNER_SIZE_BIG,
  ...props
}: LoadingSpinnerProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...props}>
      <g transform="rotate(0 16 16)">
        <g
          fill="#7F8B91" // TODO: themed?
          fillOpacity=".9"
          fillRule="evenodd"
          transform="translate(-4 -4)"
        >
          <rect width="8" height="4" x="6" y="18" opacity=".78" />
          <rect width="4" height="8" x="18" y="26" opacity=".62" />
          <rect width="8" height="4" x="26" y="18" opacity=".38" />
          <rect width="4" height="8" x="18" y="6" />
          <g transform="rotate(45 9.757 24.243)">
            <rect width="8" height="4" y="12" opacity=".93" />
            <rect width="4" height="8" x="12" y="20" opacity=".69" />
            <rect width="8" height="4" x="20" y="12" opacity=".48" />
            <rect width="4" height="8" x="12" opacity=".3" />
          </g>
        </g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 16 16; 45 16 16; 90 16 16; 135 16 16; 180 16 16; 225 16 16; 270 16 16; 315 16 16; 360 16 16"
          keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875;1"
          dur="1s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
      </g>
    </svg>
  );
}
