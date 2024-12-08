import path from "path";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import {
  ActionsProvider,
  ActionTooltip,
  AutoHoverPlatformIcon,
  CommonActionId,
  InputField,
  Item,
  ItemLayout,
  ListBox,
  MenuOverlayFromOrigin,
  PlatformIcon,
  styled,
  TooltipTrigger,
  WINDOW_SHADOW,
} from "@intellij-platform/core";
import { MENU_VERTICAL_PADDING } from "@intellij-platform/core/Menu/StyledMenu";
import { usePrevious } from "@intellij-platform/core/utils/usePrevious";
import { notImplemented } from "../../Project/notImplemented";
import { DIR_ICON } from "../../file-utils";
import { fs } from "../../fs/fs";
import { getInputCursorOffset } from "./getInputCursorOffset";

const StyledPopover = styled.div`
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${WINDOW_SHADOW}; // FIXME: OS-dependant style?
`;
const ListBoxStyledAsMenu: typeof ListBox /* https://github.com/styled-components/styled-components/issues/1803#issuecomment-2177525252 */ = styled(
  ListBox
)`
  min-width: 120px;
  margin: ${MENU_VERTICAL_PADDING}px 0;
`;

async function getChildDirectories(searchDirectory: string) {
  return fs.promises.readdir(searchDirectory).then(async (fileNames) => {
    const childItems = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(searchDirectory, fileName);
        return {
          fullPath,
          stat: await fs.promises.stat(fullPath),
        };
      })
    );
    return childItems
      .filter(({ stat }) => stat.isDirectory())
      .map(({ fullPath }) => fullPath);
  });
}

export function PathInputField({
  value: valueProp,
  onChange: onChangeProp,
  defaultValue: defaultValueProp,
  ...props
}: Omit<ComponentProps<typeof InputField>, "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useControlledState(
    valueProp,
    defaultValueProp ?? "",
    onChangeProp
  );
  const [isAutocompleteVisible, setAutocompleteVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const collectionRef = useRef<HTMLDivElement>(null);
  const onAutocompleteSuggestionSelected = (key: React.Key) => {
    setValue(path.join(`${key}`, path.sep)); // TODO: handle completion with tab
  };
  // Path search query is kept in a separate state because it needs to be updated when autocomplete action triggers.
  // Otherwise, it could be a computed value based on `isAutocompleteVisible` and `directory`
  const [pathSearchQuery, setPathSearchQuery] = useState("");
  const [pathSuggestions, setPathSuggestions] = useState<
    Array<{ fullPath: string; textValue: string }>
  >([]);
  const updatePathAutocompletion = () => {
    setMenuOrigin({
      clientX:
        (inputClientRect?.x ?? 0) + getInputCursorOffset(inputRef.current!),
      clientY: (inputClientRect?.y ?? 0) + (inputClientRect?.height ?? 0) + 2,
    });
    setPathSearchQuery(
      value.slice(0, inputRef.current?.selectionStart ?? undefined)
    );
  };
  useEffect(() => {
    if (isAutocompleteVisible) {
      updatePathAutocompletion();
    }
  }, [isAutocompleteVisible, value]);

  const wasAutocompleteVisible = usePrevious(isAutocompleteVisible);

  useEffect(() => {
    const pathParts = pathSearchQuery.split(path.sep);
    const searchDirectory = pathParts.slice(0, -1).join(path.sep) || "/";
    const query = pathParts.length > 1 ? pathParts.slice(-1)[0] : "";
    let canceled = false;
    getChildDirectories(searchDirectory).then((suggestions) => {
      if (canceled) {
        return;
      }
      // TODO: handle "No suggestions"
      const matchedSuggestions = suggestions
        .map((fullPath) => {
          const dirname = path.basename(fullPath);
          return { fullPath, textValue: dirname };
        })
        .filter(
          ({ textValue }) =>
            !query || textValue.toLowerCase().includes(query.toLowerCase())
        );
      setPathSuggestions(matchedSuggestions);
      // TODO: set "Use {0} to keep tail of the path" tip if caret position is not at the end.
      if (
        matchedSuggestions.length > 0 &&
        /* Note that wasAutocompleteVisible is a captured closure and it's intentionally not in effect's dependencies */
        !wasAutocompleteVisible &&
        inputRef.current?.value.indexOf(pathSearchQuery) === 0
      ) {
        inputRef.current.setSelectionRange(
          pathSearchQuery.length,
          inputRef.current.value.length,
          "backward"
        );
      }
    });
    return () => {
      canceled = true;
    };
  }, [pathSearchQuery]);

  const [menuOrigin, setMenuOrigin] = useState({ clientX: 0, clientY: 0 });

  const inputClientRect = inputRef.current?.getBoundingClientRect();

  return (
    <>
      <ActionsProvider
        actions={[
          {
            id: CommonActionId.CODE_COMPLETION,
            title: "Autocomplete path",
            actionPerformed: () => {
              updatePathAutocompletion();
              setAutocompleteVisible(true);
            },
          },
        ]}
      >
        {({ shortcutHandlerProps }) => (
          <InputField
            {...props}
            value={value}
            onChange={setValue}
            inputRef={mergeRefs(inputRef, props.inputRef)}
            inputProps={mergeProps(
              props.inputProps ?? {},
              shortcutHandlerProps,
              {
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Escape") {
                    setAutocompleteVisible(false);
                  }
                },
                onBlur: () => {
                  setAutocompleteVisible(false);
                },
              }
            )}
            addonAfter={
              <>
                {props.addonAfter}
                <TooltipTrigger
                  tooltip={<ActionTooltip actionName="Browse... (⇧⏎)" />}
                >
                  {(props) => (
                    <AutoHoverPlatformIcon
                      {...props}
                      style={{ marginRight: ".2rem" }}
                      role="button"
                      onClick={notImplemented}
                      icon="general/openDisk.svg"
                    />
                  )}
                </TooltipTrigger>
              </>
            }
          />
        )}
      </ActionsProvider>
      {isAutocompleteVisible && (
        <MenuOverlayFromOrigin
          onClose={() => {
            setAutocompleteVisible(false);
          }}
          origin={menuOrigin}
        >
          <StyledPopover>
            <ListBoxStyledAsMenu
              ref={collectionRef}
              focusProxyRef={inputRef}
              aria-label="Directories"
              shouldFocusOnHover
              shouldUseVirtualFocus
              autoFocus="first"
              onAction={onAutocompleteSuggestionSelected}
              items={pathSuggestions}
            >
              {({ fullPath }) => (
                <Item key={fullPath} textValue={fullPath}>
                  <ItemLayout>
                    <PlatformIcon icon={DIR_ICON} />
                    {path.basename(fullPath)}
                  </ItemLayout>
                </Item>
              )}
            </ListBoxStyledAsMenu>
          </StyledPopover>
        </MenuOverlayFromOrigin>
      )}
    </>
  );
}
