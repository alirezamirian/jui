import { CommonActionId } from "@intellij-platform/core";

export const VcsActionIds = {
  ROLLBACK: "ChangesView.Revert",
  REFRESH: "ChangesView.Refresh",
  SHELVE_SILENTLY: "ChangesView.ShelveSilently",
  SHELVE: "ChangesView.Shelve",
  UNSHELVE_SILENTLY: "ChangesView.UnshelveSilently",
  NEW_CHANGELIST: "ChangesView.NewChangeList",
  RENAME_CHANGELIST: "ChangesView.Rename",
  REMOVE_CHANGELIST: "ChangesView.RemoveChangeList",
  SET_DEFAULT_CHANGELIST: "ChangesView.SetDefault",
  MOVE_TO_ANOTHER_CHANGELIST: "ChangesView.Move",
  SHOW_DIFF: "Diff.ShowDiff", // Maybe doesn't belong here?
  CHECKIN_FILES: "CheckinFiles",
  CHECKIN_PROJECT: "CheckinProject",
  JUMP_TO_SOURCE: CommonActionId.EDIT_SOURCE,

  GROUP_CHANGES_VIEW_POPUP_MENU: "ChangesViewPopupMenu", // Not used yet
  GROUP_BY_DIRECTORY: "ChangesView.GroupBy.Directory",
  GIT_CREATE_NEW_BRANCH: "Git.CreateNewBranch",
  GIT_BRANCHES: "Git.Branches",

  GIT_LOG_HIDE_BRANCHES: "Git.Log.Hide.Branches",
  GIT_LOG_NAVIGATE_TO_SELECTED_BRANCH:
    "Git.Log.Branches.Navigate.Log.To.Selected.Branch",
  GIT_UPDATE_SELECTED: "Git.Update.Selected",

  FOCUS_TEXT_FILTER: "Vcs.Log.FocusTextFilter",
  MATCH_CASE: "Vcs.Log.MatchCaseAction",
  REG_EXP: "Vcs.Log.EnableFilterByRegexAction",
  COPY_REVISION_NUMBER: "Vcs.CopyRevisionNumberAction",
  LOG_REFRESH: "Vcs.Log.Refresh",
  SHOW_DETAILS: "Vcs.Log.ShowDetailsAction",
  SHOW_DIFF_PREVIEW: "Vcs.Log.ShowDiffPreview",
  PRESENTATION_SETTINGS: "Vcs.PresentationSettings",
  FILE_HISTORY_PRESENTATION_SETTINGS: "Vcs.FileHistory.PresentationSettings",
};
