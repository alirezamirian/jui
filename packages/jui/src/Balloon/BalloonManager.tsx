import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Balloon, BalloonProps } from "./Balloon";
import { StyledBalloonsStack } from "./StyledBalloonsStack";

type ShowProps = Pick<
  BalloonProps,
  "title" | "icon" | "body" | "actions" | "headerActions"
>;

interface BalloonManagerAPI {
  /**
   * Shows a Balloon notification on the bottom left of the screen.
   * @param props: Props to pass to the Balloon component
   * @param [autoHideTimeout=10_000] timeout in ms for hiding the balloon notification.
   * @returns hide function, in case the notification can expire for some reason.
   */
  show(props: ShowProps, autoHideTimeout?: number): () => void;
  showSticky(props: ShowProps): () => void;
}

const NotImplementedFn = () => {
  throw new Error("You must render a BalloonManager...");
};

const BalloonsContext = React.createContext<BalloonManagerAPI>({
  show: NotImplementedFn,
  showSticky: NotImplementedFn,
});

export const useBalloonManager = (): BalloonManagerAPI =>
  useContext(BalloonsContext);

type BalloonElement = ReactElement<BalloonProps, typeof Balloon>;

export interface BalloonManagerProps {
  disablePortal?: boolean;
  BalloonsContainer?: React.ElementType;
}

/**
 * Enables imperative API (via {@link useBalloonManager}) for showing Balloon notifications on the bottom right of the screen.
 * It renders notifications in a portal appended to `body`, unless `disablePortal` is `true`.
 *
 * @param disablePortal: if `true`, the container for notifications will not be rendered in a portal
 * @param BalloonsContainer: container component for the notifications. It's {@link StyledBalloonsStack} by default.
 *
 * TODO: fade in/out transition. Notes:
 *  - Doesn't seem fade-in is needed. Tho it's much easier than fade-out, as it can be achieved with a css animation.
 *  - Fade out should happen only when the balloon is being hidden by timeout.
 * TODO: Support for maximum number of notifications and showing "x more notification(s)" button if the limit exceeds
 */

export const BalloonManager: React.FC<BalloonManagerProps> = ({
  children,
  disablePortal,
  BalloonsContainer = StyledBalloonsStack,
}) => {
  const [balloons, setBalloons] = useState<Array<BalloonElement>>([]);
  const timeoutIdsRef = useRef<number[]>([]);
  const lastIdRef = useRef<number>(0);

  const api = useMemo<BalloonManagerAPI>(() => {
    const show: BalloonManagerAPI["show"] = (props, timeout = 10_000) => {
      lastIdRef.current++;
      const onClose = () => {
        setBalloons((balloons) =>
          balloons.filter((aBalloon) => aBalloon !== balloon)
        );
      };
      const balloon = (
        <Balloon
          key={lastIdRef.current}
          {...props}
          title={props.title} // TS acts unreasonable without this
          onClose={onClose}
        />
      );
      setBalloons((balloons) => {
        if (timeout > 0) {
          const timeoutId = window.setTimeout(() => {
            onClose();
            timeoutIdsRef.current = timeoutIdsRef.current.filter(
              (aTimeoutId) => aTimeoutId !== timeoutId
            );
          }, timeout);
          timeoutIdsRef.current = [...timeoutIdsRef.current, timeoutId];
        }
        return balloons.concat(balloon);
      });
      return onClose;
    };
    return {
      show,
      showSticky: (props) => show(props, 0),
    };
  }, []);

  // clear timeouts when unmounted
  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => {
        window.clearTimeout(id);
      });
    };
  }, []);

  const notificationsStack = (
    <BalloonsContainer
      style={{ position: disablePortal ? "absolute" : undefined }}
    >
      {balloons}
    </BalloonsContainer>
  );

  return (
    <BalloonsContext.Provider value={api}>
      {children}
      {disablePortal
        ? notificationsStack
        : ReactDOM.createPortal(notificationsStack, document.body)}
    </BalloonsContext.Provider>
  );
};
