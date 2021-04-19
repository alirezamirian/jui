import React, { HTMLProps, useRef, useState } from "react";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  stickySearch?: boolean;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  containerProps: Omit<HTMLProps<HTMLDivElement>, "as">;
}

const SearchTerm = styled.span`
  position: absolute;
  background: #6f6f6f;
  border: 1px solid #404040;
  color: #bfbfbf;
  z-index: 1;
  padding: 2px 10px;
  height: 20px;
  transform: translateY(-100%);
`;
const SearchableWrapper = styled.div`
  position: relative;
  overflow: visible;
`;

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

export function SpeedSearch({
  children,
  stickySearch = false,
  searchTerm = "",
  onSearchTermChange,
  containerProps,
}: Props) {
  const [isSearchTermVisible, setSearchTermVisible] = useState(false);
  const { onKeyDown } = useSimulatedInput({
    value: searchTerm,
    onChange: (value) => {
      onSearchTermChange(value);
      setSearchTermVisible(true);
    },
  });
  const clear = () => {
    onSearchTermChange("");
    setSearchTermVisible(false);
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (
        !e.ctrlKey &&
        !e.altKey &&
        (!(e.target instanceof HTMLElement) || !isTypeableElement(e.target))
      ) {
        if (e.key === "Escape") {
          clear();
        } else {
          onKeyDown(e);
        }
      }
    },
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (focused) => {
      if (!focused && !stickySearch) {
        clear();
      }
    },
  });

  return (
    <SearchableWrapper
      {...mergeProps(focusWithinProps, keyboardProps, containerProps)}
      tabIndex={-1}
    >
      {isSearchTermVisible && (
        <SearchTerm>{searchTerm.replace(/ /g, "\u00A0")}</SearchTerm>
      )}
      {children}
    </SearchableWrapper>
  );
}

function useSimulatedInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const onKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
    if (event.key.length === 1) {
      return onChange(`${valueRef.current}${event.key}`);
    }
    if (event.key === "Backspace") {
      const sliceEnd = event.metaKey ? 0 : -1;
      onChange(valueRef.current.slice(0, sliceEnd));
    }
  };
  return { onKeyDown } as const;
}
