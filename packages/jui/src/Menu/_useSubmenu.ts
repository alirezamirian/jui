import { Collection, Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import React, { Key, RefObject } from "react";
import { useKeyboard } from "@react-aria/interactions";
import { ListKeyboardDelegate } from "@react-aria/selection";

export class MenuKeyboardDelegate<T> extends ListKeyboardDelegate<T> {
  private keys: React.Key[];
  constructor(
    rootKey: Key | null,
    private collection: Collection<Node<T>>,
    disabledKeys: Set<React.Key>,
    ref: React.RefObject<HTMLElement>,
    collator?: Intl.Collator
  ) {
    super(collection, disabledKeys, ref, collator);
    this.keys = [...collection.getKeys()]
      .map((key) => collection.getItem(key))
      .flatMap((item) => {
        if (item.parentKey == rootKey) {
          if (item.type === "item") {
            return [item.key];
          } else if (item.type === "section") {
            return [...item.childNodes].map(({ key }) => key);
          }
        }
        return [];
      });
  }

  getFirstKey(): React.Key {
    return this.keys[0];
  }
  getLastKey(): React.Key {
    return this.keys.slice(-1)[0];
  }

  getKeyBelow(key: React.Key): React.Key {
    const keyBelow = super.getKeyBelow(key);
    // @ts-expect-error: getKeyBelow should be allowed to return null, but typing is currently inaccurate in react-aria
    return this.keys.includes(keyBelow) ? keyBelow : null;
  }
  getKeyAbove(key: React.Key): React.Key {
    const keyAbove = super.getKeyAbove(key);
    // @ts-expect-error: getKeyBelow should be allowed to return null, but typing is currently inaccurate in react-aria
    return this.keys.includes(keyAbove) ? keyAbove : null;
  }
}

/**
 * Behavior accessibility of submenus:
 * - Closing submenu on ArrowLeft key press.
 *   Note that it can't be implemented in useMenuItem, because the focus might be on no the submenu itself and not any
 *   of its items
 * @param rootKey: Key of the root node, the submenu is created from its children
 * @param state
 * @param ref
 */
export function useSubmenu<T>(
  { rootKey }: { rootKey: Key },
  state: TreeState<T>,
  ref: RefObject<HTMLElement>
) {
  const { keyboardProps: submenuProps } = useKeyboard({
    onKeyDown: (e) => {
      // Keyboard events bubble through portals. Don't handle keyboard events
      // for elements outside the collection (e.g. menus).
      if (!ref.current?.contains(e.target as Element)) {
        e.continuePropagation();
        return;
      }
      const root = state.collection.getItem(rootKey);
      if (e.key === "ArrowLeft" && state.expandedKeys.has(root.key)) {
        state.toggleKey(root.key);
        state.selectionManager.setFocused(true);
        state.selectionManager.setFocusedKey(root.key);
        return;
      }
      e.continuePropagation();
    },
  });

  return {
    submenuProps,
  };
}
