import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import React, { useCallback } from "react";

import { GroupByActionButton } from "../../../../GroupByActionButton";
import {
  changesGroupingActiveState,
  changesViewGroupingsState,
  GroupingIds,
} from "../ChangesView.state";

export const ChangesGroupByActionButton = (): React.ReactElement => {
  // Grouping is extensible in Intellij platform, but we only support grouping by directory here.

  const groupings = useAtomValue(changesViewGroupingsState);

  const toggleGroup = useAtomCallback(
    useCallback((_get, set, id: GroupingIds) => {
      set(changesGroupingActiveState(id), (value) => !value);
    }, [])
  );

  return <GroupByActionButton groupings={groupings} onToggle={toggleGroup} />;
};
