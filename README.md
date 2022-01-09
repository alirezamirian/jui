
## :warning: WARNING :warning:

This library is a work in progress. It's not published on npm just yet, and documentation is incomplete. But you can checkout these:
- [A WIP demo](https://alirezamirian.github.io/jui/example-app)
- [storybook](https://alirezamirian.github.io/jui/storybook/)
- The current state of the [documentation](https://alirezamirian.github.io/jui/).

# JUI

JUI is JetBrain's IntelliJ Platform UI implemented as a React.js library. A lot of accessibility aspects are implemented using hooks from [react-aria](https://react-spectrum.adobe.com/react-aria/index.html) and friends.

If you too love the user experience of the JetBrains products, and the developer experience of creating UI applications with react, you may find this interesting.

https://user-images.githubusercontent.com/3150694/147861936-e82d1394-e9df-4f63-ad80-3e4f640dd726.mp4


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
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Divider</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Disabled</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Nested list (e.g git branches) <sup>1</sup></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Select on hover (e.g git branches)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Virtualization</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Sections (with title)</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Access to state in items (selected, focused, disabled)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">re-order with Alt+arrows</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="5">Tree</td>
        </tr>
        <tr>
            <td colspan="2">Base</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Speed search</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Virtualization</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Tree node checkboxes <sup>3</sup></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Tooltip</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Progress Bar</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Icon</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3">Breadcrumb</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="3">Theming</td>
        </tr>
        <tr>
            <td colspan="2">Theme objects based on theme json files</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Support for XML color schemes</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Checkbox with label</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Button</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3">Action Button</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3">Action Toolbar</td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="3">MenuList <sup>2</sup></td>
        </tr>
        <tr>
            <td colspan="2">Basic</td>
            <td>✅</td></tr>
        <tr>
            <td colspan="2">Speed search (with input)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="4">Action System</td>
        </tr>
        <tr>
            <td colspan="2">Shortcut abstractions (KeyStroke, KeyboardShortcut, etc.)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56">Common shortcuts</a></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Keymap</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="7">Tabs</td>
        </tr>
        <tr>
            <td colspan="2">Basic support</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">multiple rows</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">single row - scroll</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">single row - shrink</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Overflow dropdown menu</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Vertical (tab placement left/right in the editor)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3">ThreeViewSplitter</td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="16">ToolWindow</td>
        </tr>
        <tr>
            <td colspan="2">Basic functionality</td>
            <td>✅</td></tr>
        <tr>
            <td colspan="2">Reordering windows</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Moving windows between anchors</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Widescreen layout</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Side by side layout on left or right</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">toggling tool window bars</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Hide action</td>
            <td>✔️</td>
        </tr>
        <tr>
            <td colspan="2">Resize</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Dock pin</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Dock unpin</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Undock</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Float</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">View Mode - Window</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Multiple content view with tab/dropdown switcher in the header</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Gear icon actions</td>
            <td>✅<sup>4</sup></td>
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

These bugs are found in the original Intellij Platform UI, which don't exist in JUI:

- in Tree with speed search, when toggling a node changes the matches, the speed search popup is
  not updated accordingly. Here is an example, in which we have this invalid state, where there
  is a match but speed search popup is red: ![img.png](packages/jui/bug-1.png)

[commonshortcuts]: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56
