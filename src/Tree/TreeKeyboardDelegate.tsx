import { ListKeyboardDelegate } from "@react-aria/selection";
import { Collection, Node } from "@react-types/shared";
import React, { Key, RefObject } from "react";

export class TreeKeyboardDelegate<T> extends ListKeyboardDelegate<T> {
  constructor(
    private collection: Collection<Node<T>>,
    private disabledKeys: Set<Key>,
    ref: RefObject<HTMLElement>
  ) {
    super(collection, disabledKeys, ref);
  }

  getKeyLeftOf(key: React.Key): React.Key {
    // Typing in KeyboardDelegate is not strictNullChecks compatible
    const item = this.collection.getItem(key);
    return item.parentKey || (item.prevKey as React.Key);
  }

  getKeyRightOf(key: React.Key): React.Key {
    return this.collection.getItem(key).nextKey as React.Key;
  }
}
