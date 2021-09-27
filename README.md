# JUI

JUI is Intellij Platform UI implemented as a React.js library.

## Features:

<table>
    <thead>
        <tr>
            <th>Component</th>
            <th colspan="2">Feature</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=10>List</td> 
        </tr>
        <tr>
            <td colspan="2">Speed Search </td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Divider</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Disabled</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Nested list (e.g git branches) <sup>1</sup></td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Select on hover (e.g git branches)</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Virtualization</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Sections (with title)</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Access to state in items (selected, focused, disabled)</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">re-order with Alt+arrows</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td rowspan="4">Tree</td>
        </tr>
        <tr>
            <td colspan="2">Base</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Speed search</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Tree node checkboxes <sup>3</sup></td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Tooltip</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Progress Bar</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Icon</td>
            <td>:construction:</td>
        </tr>
        <tr>
            <td colspan="3">Breadcrumb</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Theming</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="3">Checkbox with label</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Button</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Action Button</td>
            <td>:construction:</td>
        </tr>
        <tr>
            <td colspan="3">Action Toolbar</td>
            <td>:construction:</td>
        </tr>
        <tr>
            <td rowspan="3">MenuList <sup>2</sup></td>
        </tr>
        <tr>
            <td colspan="2">Base</td>
            <td>:x:</td></tr>
        <tr>
            <td colspan="2">Speed search (with input)</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td rowspan="4">Action System</td>
        </tr>
        <tr>
            <td colspan="2">Shortcut abstractions (KeyStroke, KeyboardShortcut, etc.)</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56">Common shortcuts</a></td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Keymap</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td rowspan="3">Tabs</td>
        </tr>
        <tr>
            <td colspan="2">Basic support</td>
            <td>:x:</td></tr>
        <tr>
            <td colspan="2">Grouping (always or when not fit in view)</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3">ThreeViewSplitter</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td rowspan="16">ToolWindow</td>
        </tr>
        <tr>
            <td colspan="2">Basic functionality</td>
            <td>:white_check_mark:</td></tr>
        <tr>
            <td colspan="2">Reordering windows</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Moving windows between anchors</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Widescreen layout</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Side by side layout on left or right</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">toggling tool window bars</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Hide action</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">Resize</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Dock pin</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Dock unpin</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Undock</td>
            <td>:white_check_mark:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Float</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Window</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Multiple content view with tab/dropdown switcher in the header</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Gear icon actions</td>
            <td>:white_check_mark:<sup>4</sup></td>
        </tr>
    </tbody>
</table>

1. Not exactly a list feature. But more about checking feasibility of it
2. It seems in Intellij UI, such menu lists are only used in popups. Maybe only
   FlatSpeedSearchPopup
3. Probably not a feature of Tree itself
4. Keyboard shortcuts for resizing windows depend on action system implementation and not done yet.
   Also "Remove from sidebar" doesn't fit with how tool windows is implemented at the moment.

### Intellij platform bugs

These bugs are found in the original Intellij Platform UI, which doesn't exist in JUI:

- in Tree with speed search, when toggling a node changes the matches, the speed search popup is
  not updated accordingly. Here is an example, in which we have this invalid state, where there
  is a match but speed search popup is red: ![img.png](packages/jui/bug-1.png)

[commonshortcuts]: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56
