import { mergeProps } from "@react-aria/utils";
import { filter } from "ramda";

/**
 * Like mergeProps, but doesn't merge props where value is null or undefined. That's needed because useFocusable (and
 * maybe some other react-aria hooks as well) return props like onFocus, with value set to null or undefined, which
 * overrides the same prop from other sources.
 */
// @ts-expect-error not sure why!
export const mergeNonNullProps: typeof mergeProps = (...propsArray) => {
  return mergeProps(
    ...propsArray.map((props): typeof props =>
      filter((value) => value != undefined, props)
    )
  );
};
