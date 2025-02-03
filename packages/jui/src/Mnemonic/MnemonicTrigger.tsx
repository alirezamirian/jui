import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";

export interface MnemonicProps {
  children: React.ReactNode;
  /**
   * Character to be used as {@link https://jetbrains.design/intellij/principles/mnemonics/ mnemonic}.
   */
  mnemonic: string;
  /**
   * Called when mnemonic key is pressed with the activator key
   */
  onTriggered?: () => void;

  /**
   * Whether the mnemonic is disabled. Useful when setting mnemonic on disable-able components, to just pass
   * isDisabled prop down to MnemonicTrigger
   */
  isDisabled?: boolean;
}

const MnemonicContext = createContext<{
  character: string | null;
  rendered: () => void;
  /**
   * Called when mnemonic is found in the text of the trigger component and rendered underlined, so the user
   * can have a chance to know how to trigger the component's action via mnemonic.
   */
  active: boolean;
}>({ character: null, active: false, rendered: () => {} });

export const MnemonicTrigger = ({
  children,
  mnemonic,
  isDisabled,
  onTriggered: onTriggeredProp = () => {},
}: MnemonicProps): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const onTriggered = useEventCallback(onTriggeredProp);
  const [active, setActive] = useState(false);
  const keydownListener = useEventCallback((e: KeyboardEvent) => {
    if (isDisabled) {
      return;
    }
    if (active && !e.repeat) {
      const character = e.code.match(/Key([A-Z])/)?.[1];
      if (character && character.toLowerCase() === mnemonic.toLowerCase()) {
        e.preventDefault();
        onTriggered();
      }
    }
    if (e.key === "Alt" && ref.current && isAccessible(ref.current)) {
      setActive(true);
    }
  });

  useEffect(() => {
    // calling addEventListener with already registered listener is no-op.
    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);
    window.addEventListener("blur", onBlur);
    function onBlur() {
      setActive(false);
    }
    function keyupListener(e: KeyboardEvent) {
      if (e.key === "Alt") {
        setActive(false);
      }
    }
    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const renderedMnemonicRef = useRef<string>("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (renderedMnemonicRef.current !== mnemonic) {
        console.warn(
          `Mnemonic ${mnemonic} was set but not rendered to the user. 
Make sure the specified character is rendered directly in MnemonicTrigger, or wrapped by MnemonicText inside MnemonicTrigger children. 
Element:`,
          ref.current?.parentElement
        );
      }
    });
    return () => {
      clearTimeout(timerId);
    };
  }, [mnemonic]);
  return (
    <MnemonicContext.Provider
      value={{
        character: mnemonic,
        active,
        rendered: () => {
          renderedMnemonicRef.current = mnemonic;
        },
      }}
    >
      <span hidden ref={ref} />
      {typeof children === "string" ? (
        <MnemonicText>{children}</MnemonicText>
      ) : (
        children
      )}
    </MnemonicContext.Provider>
  );
};

/**
 * Checks if a
 * See more in ./design-decisions.md
 */
function isAccessible(element: Element): boolean {
  return (
    !element.closest("[aria-hidden]") &&
    element.parentElement !== null &&
    isVisible(element.parentElement)
  );
}
function isVisible(e: HTMLElement) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
/**
 * Used inside MnemonicTrigger children, when the direct child can't be a string.
 * @example
 * ```tsx
 * <MnemonicTrigger mnemonic="D">
 *    <>
 *      <MnemonicText>Disconnect</MnemonicText>
 *    </>
 * </MnemonicTrigger>
 * ```
 */
export function MnemonicText({ children }: { children: string }) {
  const { character, active, rendered } = useContext(MnemonicContext);
  if (character) {
    const index =
      [
        // Prioritizing word start.
        // E.g. "Include disabled actions".
        // In the reference impl, mnemonic is specified by "_" before a character and therefore the index is pre-determined.
        // But that comes with its own problems and doesn't seem necessary.
        children.match(new RegExp(`^${character}`, "i"))?.index ?? -1,
        (children.match(new RegExp(` ${character}`, "i"))?.index ?? -2) + 1,
        children.toLowerCase().indexOf(character.toLowerCase()),
      ].find((index) => index >= 0) ?? -1;
    const found = index > -1;
    if (found) {
      rendered();
    }
    if (found && active) {
      return (
        <>
          {children.slice(0, index)}
          <u>{children.slice(index, index + 1)}</u>
          {children.slice(index + 1)}
        </>
      );
    }
  }
  return <>{children}</>;
}
