import {
  MultipleSelectionState,
  SelectionManager as OriginalSelectionManager,
} from "@react-stately/selection";
import { Collection, Node, PressEvent } from "@react-types/shared";
import { Key } from "react";
import { isCtrlKeyPressed } from "../utils/keyboard-utils";

export class SelectionManager extends OriginalSelectionManager {
  constructor(
    collection: Collection<Node<unknown>>,
    state: MultipleSelectionState
  ) {
    super(collection, state);
  }
  select(key: Key, e?: PressEvent | PointerEvent) {
    if (this.selectionMode === "none") {
      return;
    }

    if (this.selectionMode === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection) {
        this.toggleSelection(key);
      } else {
        this.replaceSelection(key);
      }
    } else {
      if (e?.shiftKey) {
        this.extendSelection(key);
      } else if (
        isCtrlKeyPressed(e) &&
        (this.selectedKeys.size > 1 || !this.isSelected(key))
      ) {
        this.toggleSelection(key);
      } else {
        this.replaceSelection(key);
      }
    }
  }
}
