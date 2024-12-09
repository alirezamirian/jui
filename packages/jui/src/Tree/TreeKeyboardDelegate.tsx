import { ListKeyboardDelegate } from "@react-aria/selection";
import { Collection, Node } from "@react-types/shared";
import React, { Key, RefObject } from "react";

export class TreeKeyboardDelegate<T> extends ListKeyboardDelegate<T> {
  constructor(
    private collection: Collection<Node<T>>,
    disabledKeys: Set<Key>,
    ref: RefObject<HTMLElement>,
    collator?: Intl.Collator
  ) {
    super({
      collection,
      disabledKeys,
      ref,
      collator,
      // Since @react-aria/selection@3.16.0 getKeyLeftOf and getKeyRightOf is
      // removed if orientation is vertical and layout is "stack".
      layout: "grid",
    });
  }

  getKeyLeftOf(key: React.Key): React.Key | null {
    const item = this.collection.getItem(key);
    return item?.parentKey ?? this.getKeyAbove(key);
  }

  getKeyRightOf(key: React.Key): React.Key | null {
    return this.getKeyBelow(key);
  }
}
