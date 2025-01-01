import React, { useCallback } from "react";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import { GroupByActionButton } from "../../../GroupByActionButton";
import {
  availableGroupingsAtom,
  branchTreeGroupingAtoms,
} from "./BranchesTree.state";

export function BranchesGroupByActionButton() {
  //  TODO: Generalize and convert to actions
  const toggleGroup = useAtomCallback(
    useCallback(
      (get, set) => (id: "directory" | "repository") => {
        set(branchTreeGroupingAtoms(id), (value) => !value);
      },
      []
    )
  );
  const availableGroupings = useAtomValue(availableGroupingsAtom);

  return (
    <GroupByActionButton
      groupings={availableGroupings}
      onToggle={toggleGroup}
    />
  );
}
