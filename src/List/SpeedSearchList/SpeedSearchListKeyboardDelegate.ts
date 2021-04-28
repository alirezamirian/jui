// When virtualization is added, this or at least the base class should also be changed.
import { ListKeyboardDelegate } from "@react-aria/selection";
import React, { Key, RefObject } from "react";
import { TextRange } from "../../TextRange";
import { Collection, Node } from "@react-types/shared";

/**
 * Keyboard delegate which is aware of matched keys and limits navigation to those keys.
 * Note: select all action is not handled in KeyboardDelegate.
 * Note: when virtualization is added, this probably need to change, like how it's handled
 * in `useListBoxLayout` in react spectrum.
 */
export class SpeedSearchListKeyboardDelegate<
  T
> extends ListKeyboardDelegate<T> {
  constructor(
    collection: Collection<Node<T>>,
    disabledKeys: Set<Key>,
    ref: RefObject<HTMLElement>,
    protected matches: Map<Key, TextRange[]> | null
  ) {
    super(collection, disabledKeys, ref);
  }

  // TODO: page up and down deactivate speed search. If we want that, we can pass the speedSearch
  //  object too. but doesn't seem like the best way to do it, even it the same behavior is expected

  getKeyBelow(key: React.Key): React.Key {
    let keyBelow = super.getKeyBelow(key);
    while (keyBelow != null) {
      if (!this.matches || this.matches.has(keyBelow)) {
        return keyBelow;
      }
      keyBelow = super.getKeyBelow(keyBelow);
    }
    return key;
  }

  getKeyAbove(key: React.Key): React.Key {
    let keyAfter = super.getKeyAbove(key);
    while (keyAfter != null) {
      if (!this.matches || this.matches.has(keyAfter)) {
        return keyAfter;
      }
      keyAfter = super.getKeyAbove(keyAfter);
    }
    return key;
  }
}
