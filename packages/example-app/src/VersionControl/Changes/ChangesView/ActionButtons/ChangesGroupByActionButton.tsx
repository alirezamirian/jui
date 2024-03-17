import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { GroupByActionButton } from "../../../../GroupByActionButton";
import {
  changesViewGroupingsState,
  changesGroupingActiveState,
  GroupingIds,
} from "../ChangesView.state";

export const ChangesGroupByActionButton = (): React.ReactElement => {
  // Grouping is extensible in Intellij platform, but we only support grouping by directory here.

  const groupings = useRecoilValue(changesViewGroupingsState);

  const toggleGroup = useRecoilCallback(
    ({ set }) =>
      (id: GroupingIds) => {
        set(changesGroupingActiveState(id), (value) => !value);
      },
    []
  );

  return <GroupByActionButton groupings={groupings} onToggle={toggleGroup} />;
};
