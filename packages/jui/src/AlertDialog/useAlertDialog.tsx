import React, { ReactNode } from "react";
import { useWindowManager } from "@intellij-platform/core/ModalWindow";
import { Button } from "@intellij-platform/core/Button";

import { AlertDialog } from "./AlertDialog";

export interface AlertDialogApi {
  confirm(options: {
    title: ReactNode;
    message: ReactNode;
    okText?: string;
    cancelText?: string;
  }): Promise<boolean>;
}

/**
 * Similar to com.intellij.openapi.ui.Messages class in the reference impl, provides helper functions
 * to show different types of Alert dialog. The helper functions return a Promise of the selected option,
 * which makes it easy to use it imperatively, in a flow of statements, regardless of how the UI of the
 * alert dialog is handled.
 * {@link useAlertDialog} depends on {@link WindowManager}, to imperatively open modal windows.
 * @experimental
 */
export function useAlertDialog(): AlertDialogApi {
  const { open } = useWindowManager();
  return {
    confirm: ({ title, message, okText = "Ok", cancelText = "Cancel" }) =>
      new Promise((resolve) => {
        open(({ close }) => (
          <AlertDialog
            type="question"
            body={message}
            heading={title}
            buttons={
              <>
                <Button onPress={close}>{cancelText}</Button>
                <Button
                  variant="default"
                  onPress={() => {
                    resolve(true);
                    close();
                  }}
                >
                  {okText}
                </Button>
              </>
            }
            onClose={() => resolve(false)}
          />
        ));
      }),
  };
}
