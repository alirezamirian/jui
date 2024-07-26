import { ListKeyboardDelegate } from "@react-aria/selection";
import { Collection, Node } from "@react-types/shared";
import React, { Key, RefObject } from "react";

export class TreeKeyboardDelegate<T> extends ListKeyboardDelegate<T> {
  constructor(
    private collection: Collection<Node<T>>,
    private disabledKeys: Set<Key>,
    ref: RefObject<HTMLElement>,
    collator?: Intl.Collator
  ) {
    super(collection, disabledKeys, ref, collator);
  }

  getKeyLeftOf(key: React.Key): React.Key {
    const item = this.collection.getItem(key);
    return item?.parentKey ?? this.getKeyAbove(key);
  }

  getKeyRightOf(key: React.Key): React.Key {
    return this.getKeyBelow(key);
  }
}
