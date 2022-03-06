import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Balloon, BalloonProps } from "@intellij-platform/core";
import { StyledBalloonsStack } from "@intellij-platform/core/Balloon/StyledBalloonsStack";

interface BalloonsAPI {
  /**
   * Shows a Balloon notification on the bottom left of the screen.
   * @returns hide function, in case the notification can expire for some reason.
   */
  show(
    props: Pick<BalloonProps, "title" | "body" | "actions" | "headerActions">,
    timeout?: number
  ): () => void;
}

const BalloonsContext = React.createContext<BalloonsAPI>({
  show: () => {
    throw new Error("You must render a BalloonsProvider...");
  },
});

export const useBalloons = (): BalloonsAPI => useContext(BalloonsContext);

type BalloonElement = ReactElement<BalloonProps, typeof Balloon>;

export interface BalloonsProviderProps {
  disablePortal?: boolean;
  BalloonsContainer?: React.ElementType;
}

/**
 * Enables imperative API (via {@link useBalloons}) for showing Balloon notifications on the bottom right of the screen.
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

export const BalloonsProvider: React.FC<BalloonsProviderProps> = ({
  children,
  disablePortal,
  BalloonsContainer = StyledBalloonsStack,
}) => {
  const [balloons, setBalloons] = useState<Array<BalloonElement>>([]);
  const timeoutIdsRef = useRef<number[]>([]);

  const api = useMemo<BalloonsAPI>(
    () => ({
      show: (props, timeout = 0) => {
        const onClose = () => {
          setBalloons((balloons) =>
            balloons.filter((aBalloon) => aBalloon !== balloon)
          );
        };
        const balloon = (
          <Balloon
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
      },
    }),
    []
  );

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
