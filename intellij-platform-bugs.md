# Intellij platform bugs

This page is a record of UI/UX issues of Intellij Platform, found during implementation of jui. They don't exist in JUI.

1. In Tree with speed search, when toggling a node changes the matches, the speed search popup is
   not updated accordingly. Here is an example, in which we have this invalid state, where there
   is a match but speed search popup is red: ![img.png](packages/jui/bug-1.png)

### Search everywhere state issue

1. Go to "Actions" tab in Search Everywhere popup
2. Enter a query for which no enabled action is found. This will auto-select "Include disabled actions"
3. Go to "All" tab. "Include non-project items" is unchecked, but disabled actions are shown. The disabled items
   go away, if "Include non-project items" is toggled on and then off again

## Search everywhere input change on mnemonic

1. Go to "All" tab in Search Everywhere popup
2. Hold Alt key for mnemonics to show. Press "n" to toggle "Include non-project items"
3. Search field also receives the input ("˜")

[commonshortcuts]: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56
