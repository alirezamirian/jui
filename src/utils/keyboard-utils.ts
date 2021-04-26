import { isMac } from "@react-aria/utils";

export function isCtrlKeyPressed(
  e: { metaKey: boolean; ctrlKey: boolean } | undefined
) {
  if (isMac()) {
    return e?.metaKey;
  }

  return e?.ctrlKey;
}
