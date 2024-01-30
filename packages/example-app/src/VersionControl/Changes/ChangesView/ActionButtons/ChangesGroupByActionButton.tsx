import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { GroupByActionButton } from "../../../../GroupByActionButton";
import {
  availableGroupingsState,
  changesGroupingState,
  GroupingIds,
} from "../ChangesView.state";

export const ChangesGroupByActionButton = (): React.ReactElement => {
  // Grouping is extensible in Intellij platform, but we only support grouping by directory here.

  const availableGroupings = useRecoilValue(availableGroupingsState);

  const toggleGroup = useRecoilCallback(
    ({ set }) =>
      (id: GroupingIds) => {
        set(changesGroupingState(id), (value) => !value);
      },
    []
  );

  return (
    <GroupByActionButton
      groupings={availableGroupings}
      onToggle={toggleGroup}
    />
  );
};
