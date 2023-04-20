import { SearchEverywhereContributor } from "../../SearchEverywhereContributor";
import {
  Action,
  ActionDefinition,
  ActionShortcut,
  Checkbox,
  CommonActionId,
  getAvailableActionsFor,
  minusculeMatch,
  TextRange,
} from "@intellij-platform/core";
import { searchEverywhereState } from "../../searchEverywhere.state";
import React, { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { ActionItem } from "./ActionItem";

export const actionsSearchContributor: SearchEverywhereContributor<{
  action: Action;
  highlights: TextRange[] | null;
}> = {
  id: "Actions",
  title: "Actions",
  actionId: CommonActionId.GO_TO_ACTION,
  use: ({ everyWhereAutoSet }: { everyWhereAutoSet: boolean }) => {
    const contextElement = useRecoilValue(searchEverywhereState.contextElement);
    const [showDisabledActions, setShowDisabledActions] = useState<
      null | boolean
    >(null);
    const allActions = useMemo(
      () => (contextElement ? getAvailableActionsFor(contextElement) : []),
      [contextElement]
    );
    const shouldIncludeDisabledActions =
      showDisabledActions ?? everyWhereAutoSet;
    const actions: ActionDefinition[] = [
      {
        id: CommonActionId.SHOW_INTENTION_ACTIONS,
        title: "Assign a shortcut",
        actionPerformed() {
          alert("Not implemented!");
        },
      },
    ];
    return {
      search: (query: string) => {
        const allResults = allActions
          .map((action) => ({
            highlights: minusculeMatch(action.title, query),
            action,
          }))
          .filter(
            ({ action, highlights }) =>
              highlights || minusculeMatch(action.description || "", query)
          );
        return shouldIncludeDisabledActions
          ? allResults
          : allResults.filter(({ action }) => !action.isDisabled);
      },
      searchDeps: [shouldIncludeDisabledActions],
      isEverywhere: shouldIncludeDisabledActions,
      // canToggleEverywhere: true, // TODO: is it needed?
      toggleEverywhere: () => {
        setShowDisabledActions((currentValue) => !currentValue);
      },
      searchAdvertiser: (
        <ActionShortcut actionId={CommonActionId.SHOW_INTENTION_ACTIONS}>
          {(shortcut) => `Press ${shortcut} to assign a shortcut`}
        </ActionShortcut>
      ),
      headerFilters: (
        <Checkbox
          preventFocus
          isSelected={shouldIncludeDisabledActions}
          onChange={(value) => {
            setShowDisabledActions(value);
          }}
        >
          Include disabled actions
        </Checkbox>
      ),
      actions,
      processSelectedItem({ action }) {
        action?.perform({
          event: null,
          element: contextElement,
        });
      },
      getKey: ({ action }) => action.id,
      renderItem({
        action,
        highlights,
      }: {
        action: Action;
        highlights: TextRange[] | null;
      }) {
        return <ActionItem action={action} highlights={highlights} />;
      },
    };
  },
};
