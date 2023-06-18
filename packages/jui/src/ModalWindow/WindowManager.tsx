import React, {
  ReactElement,
  ReactNode,
  Suspense,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { ModalWindow, ModalWindowProps } from "./ModalWindow";

interface WindowManagerAPI {
  /**
   * Shows a modal window within the stack of windows managed by {@link WindowManager}.
   * The opened windows will be closed when `onClose` interactions happen.
   */
  openModalWindow(
    props:
      | ModalWindowProps["children"]
      | ((args: { close: () => void }) => ModalWindowProps["children"]),
    options?: Omit<ModalWindowProps, "children">
  ): void;
}

const NotImplementedFn = () => {
  throw new Error(
    "WindowManager not found. Wrap your application with WindowManager to be able to open windows imperatively"
  );
};

const WindowsContext = React.createContext<WindowManagerAPI>({
  openModalWindow: NotImplementedFn,
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
    const openModalWindow: WindowManagerAPI["openModalWindow"] = (
      content,
      props = {}
    ) => {
      newKeyRef.current++;
      const close = () => {
        setWindows((currentWindows) =>
          currentWindows.filter((aWindow) => aWindow !== window)
        );
        props.onClose?.();
      };
      const window = (
        <Suspense fallback={null}>
          <ModalWindow key={newKeyRef.current} {...props} onClose={close}>
            {typeof content === "function" ? content({ close }) : content}
          </ModalWindow>
        </Suspense>
      );
      setWindows((currentWindows) => currentWindows.concat(window));
    };
    return {
      openModalWindow,
    };
  }, []);

  return (
    <WindowsContext.Provider value={api}>
      {children}
      {windows}
    </WindowsContext.Provider>
  );
};
