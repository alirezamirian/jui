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
            <td>:construction:</td>
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
            <td rowspan="3">Tree</td>
        </tr>
        <tr>
            <td colspan="2">Base</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Speed search</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="3">Theming</td>
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
            <td colspan="2">[Common shortcuts][CommonShortcuts]</td>
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
            <td rowspan="1" colspan="3">SplitView</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td rowspan="10">ToolWindow</td>
        </tr>
        <tr>
            <td colspan="2">Basic functionality</td>
            <td>:x:</td></tr>
        <tr>
            <td colspan="2">Moving windows</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Minimize</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Resize</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Moving windows</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">Start and end tool windows</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Dock unpin</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Undock</td>
            <td>:x:</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Float</td>
            <td>:x:</td>
        </tr>
    </tbody>
</table>

1. Not exactly a list feature. But more about checking feasibility of it
2. It seems in Intellij UI, such menu lists are only used in popups. Maybe only 
   FlatSpeedSearchPopup



[CommonShortcuts]: https://github.com/JetBrains/intellij-community/blob
/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56
