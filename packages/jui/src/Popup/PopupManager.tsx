import React, {
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Popup, PopupProps } from "./Popup";

interface PopupManagerAPI {
  /**
   * Shows a popup within the stack of popups managed by {@link PopupManager}.
   * The opened popup will be closed when `onClose` interactions happen.
   */
  show(
    // not sure about the API here. We could also just accept element of type Popup, but there are some caveats to that:
    // - if the element is not really a popup, we can't control onClose. By rendering <Popup /> it's better guaranteed.
    // - if a `open` prop gets added to Popup (for convenient and/or for animation), it would be meaningless here.
    props:
      | PopupProps["children"]
      | ((args: { close: () => void }) => PopupProps["children"]),
    options?: Omit<PopupProps, "children">
  ): void;
}

const NotImplementedFn = () => {
  throw new Error(
    "PopupsProvider not found. Wrap your application with PopupsProvider to be able to open popups imperatively"
  );
};

const PopupsContext = React.createContext<PopupManagerAPI>({
  show: NotImplementedFn,
});

/**
 * Returns imperative API for showing popups.
 *
 */
export const usePopupManager = (): PopupManagerAPI => useContext(PopupsContext);

type PopupElement = ReactElement<PopupProps, typeof Popup>;

export interface PopupManagerProps {
  children?: ReactNode;
}

/**
 * Enables imperative API (via {@link usePopupManager}) for showing Popups.
 * It renders popups in a portal appended to `body`, unless `disablePortal` is `true`.
 *
 */

export const PopupManager: React.FC<PopupManagerProps> = ({ children }) => {
  const [popups, setPopups] = useState<Array<PopupElement>>([]);
  const newKeyRef = useRef<number>(0);

  const api = useMemo<PopupManagerAPI>(() => {
    const show: PopupManagerAPI["show"] = (content, props = {}) => {
      newKeyRef.current++;
      const close = () => {
        setPopups((currentPopups) =>
          currentPopups.filter((aPopup) => aPopup !== popup)
        );
        props.onClose?.();
      };
      const popup = (
        <Popup key={newKeyRef.current} {...props} onClose={close}>
          {typeof content === "function" ? content({ close }) : content}
        </Popup>
      );
      setPopups((currentPopups) => currentPopups.concat(popup));
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
