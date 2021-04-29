import { MultipleSelectionState } from "@react-stately/selection";
import { Collection, Node, PressEvent } from "@react-types/shared";
import { Key } from "react";
import { SelectionManager } from "../../selection/SelectionManager";
import { TextRange } from "../../TextRange";

export class SpeedSearchSelectionManager extends SelectionManager {
  constructor(
    collection: Collection<Node<unknown>>,
    protected state: MultipleSelectionState,
    private matches: Map<Key, TextRange[]> | null
  ) {
    super(collection, state);
  }
  selectAll() {
    if (this.matches) {
      this.state.setSelectedKeys(
        new Set(
          [...this.matches.keys()].filter(
            (key) => !this.state.disabledKeys.has(key)
          )
        )
      );
    } else {
      super.selectAll();
    }
  }
}
