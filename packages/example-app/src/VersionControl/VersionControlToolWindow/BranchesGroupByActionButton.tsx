import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { GroupByActionButton } from "../../GroupByActionButton";
import {
  availableGroupingsState,
  branchTreeGroupingState,
} from "./BranchesTree.state";

export function BranchesGroupByActionButton() {
  //  TODO: Generalize and convert to actions
  const toggleGroup = useRecoilCallback(
    ({ set }) =>
      (id: "directory" | "repository") => {
        set(branchTreeGroupingState(id), (value) => !value);
      },
    []
  );
  const availableGroupings = useRecoilValue(availableGroupingsState);

  return (
    <GroupByActionButton
      groupings={availableGroupings}
      onToggle={toggleGroup}
    />
  );
}
