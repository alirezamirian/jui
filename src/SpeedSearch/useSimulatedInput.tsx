import React, { useRef } from "react";

function isTypeableElement(elem: HTMLElement): boolean {
  const nonTypeableInputTypes: Array<HTMLInputElement["type"]> = [
    "checkbox",
    "radio",
    "button",
  ];
  return (
    elem.isContentEditable ||
    (elem instanceof HTMLInputElement &&
      !nonTypeableInputTypes.includes(elem.type)) ||
    elem instanceof HTMLTextAreaElement
  );
}

/**
 * Main use case is for a list of item, which can have keyboard focus, be filterable and capture
 * typing if the corresponding keyboard events are not happening on an inner element (like an input)
 * that already handles typing.
 * @param value
 * @param onChange
 * TODO: add support for removing word by word by alt+backspace like native text fields.
 * TODO: add support for removing the whole content by command/ctrl+backspace.
 */
export function useSimulatedInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const onKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
    if (
      !event.ctrlKey &&
      !event.altKey &&
      (!(event.target instanceof HTMLElement) ||
        !isTypeableElement(event.target))
    ) {
      if (event.key.length === 1) {
        return onChange(`${valueRef.current}${event.key}`);
      }
      if (event.key === "Backspace") {
        const sliceEnd = event.metaKey ? 0 : -1;
        onChange(valueRef.current.slice(0, sliceEnd));
      }
    }
  };
  return { onKeyDown } as const;
}
