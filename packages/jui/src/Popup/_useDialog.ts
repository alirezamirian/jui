/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { AriaDialogProps } from "@react-types/dialog";
import { FocusableElement } from "@react-types/shared";
import { filterDOMProps, useSlotId } from "@react-aria/utils";
import { focusSafely } from "@react-aria/focus";
import { RefObject, useEffect } from "react";
import { useOverlayFocusContain } from "@react-aria/overlays";
import { DialogAria } from "@react-aria/dialog";

////////////////// NOTE //////////////////////////
// This is a copy of useDialog from react-aria, with a little part removed from the useEffect call.
// In the original code, inside the effect, there is a hack to fix an issue in Safari, which involves
// blurring and refocusing the element. Even though there is a comment about an attempt to make it work
// nice when used with `shouldCloseOnBlur` option of `useOverlay`, it didn't work and the refocusing causes
// the popup to close. Probably because in our case useOverlay and useDialog are used in the same level, but
// in what they've tested on in react-aria, useDialog is used in something nested in the component that uses
// useDialog.
// TODO: replace with original useDialog, if the issue explained above got fixed in some version of react-aria.
//////////////////////////////////////////////////
/**
 * Provides the behavior and accessibility implementation for a dialog component.
 * A dialog is an overlay shown above other content in an application.
 */
export function useDialog(
  props: AriaDialogProps,
  ref: RefObject<FocusableElement>
): DialogAria {
  let { role = "dialog" } = props;
  let titleId: string | undefined = useSlotId();
  titleId = props["aria-label"] ? undefined : titleId;

  // Focus the dialog itself on mount, unless a child element is already focused.
  useEffect(() => {
    if (ref.current && !ref.current.contains(document.activeElement)) {
      focusSafely(ref.current);
    }
  }, [ref]);

  useOverlayFocusContain();

  return {
    dialogProps: {
      ...filterDOMProps(props, { labelable: true }),
      role,
      tabIndex: -1,
      "aria-labelledby": props["aria-labelledby"] || titleId,
    },
    titleProps: {
      id: titleId,
    },
  };
}
