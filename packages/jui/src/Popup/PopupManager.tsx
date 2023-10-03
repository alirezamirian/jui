import React, {
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Popup, PopupProps } from "./Popup";
import { PopupControllerContext } from "@intellij-platform/core/Popup/PopupContext";

interface PopupManagerAPI {
  /**
   * Shows a popup within the stack of popups managed by {@link PopupManager}.
   * The opened popup will be closed when `onClose` interactions happen.
   */
  show(
    popup:
      | React.ReactElement<PopupProps, typeof Popup>
      | ((args: {
          close: () => void;
        }) => React.ReactElement<PopupProps, typeof Popup>)
  ): void;
}

const NotImplementedFn = () => {
  throw new Error(
    "PopupManager not found. Wrap your application with PopupManager to be able to open popups imperatively"
  );
};

const PopupsContext = React.createContext<PopupManagerAPI>({
  show: NotImplementedFn,
});

/**
 * Returns imperative API for showing popups.
 */
export const usePopupManager = (): PopupManagerAPI => useContext(PopupsContext);

type PopupElement = ReactElement<PopupProps, typeof Popup>;

export interface PopupManagerProps {
  children?: ReactNode;
}

/**
 * Enables imperative API (via {@link usePopupManager}) for showing Popups.
 * It renders popups in a portal appended to `body`, unless `disablePortal` is `true`.
 */
export const PopupManager: React.FC<PopupManagerProps> = ({ children }) => {
  const [popups, setPopups] = useState<Array<PopupElement>>([]);
  const newKeyRef = useRef<number>(0);

  const api = useMemo<PopupManagerAPI>(() => {
    const show: PopupManagerAPI["show"] = (popup) => {
      newKeyRef.current++;
      const close = () => {
        setPopups((currentPopups) =>
          currentPopups.filter((aPopup) => aPopup !== wrappedPopup)
        );
      };
      const wrappedPopup = (
        <PopupControllerContext.Provider
          key={newKeyRef.current}
          value={{ onClose: close }}
        >
          {typeof popup === "function" ? popup({ close }) : popup}
        </PopupControllerContext.Provider>
      );
      setPopups((currentPopups) => currentPopups.concat(wrappedPopup));
    };
    return {
      show,
    };
  }, []);

  return (
    <PopupsContext.Provider value={api}>
      {children}
      {popups}
    </PopupsContext.Provider>
  );
};
