/**
 * Drop shadow of windows and other overlays.
 * The current value is not accurate and needs to be revisited. It should also be os-dependant.
 * FIXME: On windows, there is only a border-like shadow. No drop shadow
 * FIXME: On Mac, there is a border-like shadow and a drop shadow. the border-like shadow is missing in the current value
 */
export const WINDOW_SHADOW = "box-shadow: 0 5px 15px rgb(0 0 0 / 30%)";
