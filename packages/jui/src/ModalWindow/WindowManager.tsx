import React, {
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ModalWindow,
  ModalWindowProps,
  WindowControllerContext,
} from "./ModalWindow";

export interface WindowManagerAPI {
  /**
   * Shows a modal window within the stack of windows managed by {@link WindowManager}.
   * The opened windows will be closed when `onClose` interactions happen.
   * Returns a Promise which is resolved when the modal window is closed.
   *
   * Modal window element, or a function that returns the modal window element can
   * be passed.
   * If a function is passed, it will receive a close function in its object argument,
   * which can be used to resolve the returned promise with.
   *
   * @example
   *
   * ```
   * const windowManager = useWindowManager();
   *
   * const showWindow = () => {
   *   windowManager
   *     .open<boolean>(({ close }) => (
   *       <ModalWindow>
   *         <WindowLayout
   *           header="..."
   *           content={<>...</>}
   *           footer={
   *             <WindowLayout.Footer
   *               right={
   *                 <>
   *                   <Button onPress={close}>Cancel</Button>
   *                   <Button onPress={() => close(true)}>Ok</Button>
   *                 </>
   *               }
   *             />
   *           }
   *         />
   *       </ModalWindow>
   *     ))
   *     .then((confirmed) => alert(`confirmed: ${confirmed ?? false}`));
   * };
   * ```
   */
  open<T>(
    props:
      | React.ReactElement<ModalWindowProps, typeof ModalWindow>
      | ((args: {
          close: (result?: T) => void;
        }) => React.ReactElement<ModalWindowProps, typeof ModalWindow>)
  ): Promise<T | undefined>;
}

const NotImplementedFn = () => {
  throw new Error(
    "WindowManager not found. Wrap your application with WindowManager to be able to open windows imperatively"
  );
};

const WindowsContext = React.createContext<WindowManagerAPI>({
  open: NotImplementedFn,
});

/**
 * Returns imperative API for showing windows.
 *
 */
export const useWindowManager = (): WindowManagerAPI =>
  useContext(WindowsContext);

type WindowElement = ReactElement<ModalWindowProps, typeof ModalWindow>;

export interface WindowManagerProps {
  children?: ReactNode;
}

/**
 * Enables imperative API (via {@link useWindowManager}) for opening windows.
 * It renders windows in a portal appended to `body`, unless `disablePortal` is `true`.
 *
 */
export const WindowManager: React.FC<WindowManagerProps> = ({ children }) => {
  const [windows, setWindows] = useState<Array<WindowElement>>([]);
  const newKeyRef = useRef<number>(0);

  const api = useMemo<WindowManagerAPI>(() => {
    return {
      open: function <T>(content: Parameters<WindowManagerAPI["open"]>[0]) {
        return new Promise<T | undefined>((resolve) => {
          newKeyRef.current++;
          const close = (result?: T) => {
            setWindows((currentWindows) =>
              currentWindows.filter((aWindow) => aWindow !== window)
            );
            // Make sure (?) to resolve the promise after the dialog is closed,
            // for the focus to be restored to the previous element before the
            // potential further actions take place.
            requestAnimationFrame(() => {
              resolve(result);
            });
          };
          const window = (
            <WindowControllerContext.Provider
              value={{
                onClose: () => {
                  close();
                },
              }}
              key={newKeyRef.current}
            >
              {typeof content === "function"
                ? // @ts-expect-error close signature is not correctly inferred
                  content({ close })
                : content}
            </WindowControllerContext.Provider>
          );
          setWindows((currentWindows) => currentWindows.concat(window));
        });
      },
    };
  }, []);

  return (
    <WindowsContext.Provider value={api}>
      {children}
      {windows}
    </WindowsContext.Provider>
  );
};
