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
  WindowControllerContext,
  ModalWindowProps,
} from "./ModalWindow";

interface WindowManagerAPI {
  /**
   * Shows a modal window within the stack of windows managed by {@link WindowManager}.
   * The opened windows will be closed when `onClose` interactions happen.
   */
  open(
    props:
      | React.ReactElement<ModalWindowProps, typeof ModalWindow>
      | ((args: {
          close: () => void;
        }) => React.ReactElement<ModalWindowProps, typeof ModalWindow>)
  ): void;
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
    const openModalWindow: WindowManagerAPI["open"] = (content) => {
      newKeyRef.current++;
      const close = () => {
        setWindows((currentWindows) =>
          currentWindows.filter((aWindow) => aWindow !== window)
        );
      };
      const window = (
        <WindowControllerContext.Provider
          value={{ onClose: close }}
          key={newKeyRef.current}
        >
          {typeof content === "function" ? content({ close }) : content}
        </WindowControllerContext.Provider>
      );
      setWindows((currentWindows) => currentWindows.concat(window));
    };
    return {
      open: openModalWindow,
    };
  }, []);

  return (
    <WindowsContext.Provider value={api}>
      {children}
      {windows}
    </WindowsContext.Provider>
  );
};
