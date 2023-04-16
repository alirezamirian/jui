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
            <td rowspan="11"><a href="https://jetbrains.github.io/ui/controls/list/">List</a></td> 
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/principles/speed_search/">Speed Search</a></td>
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
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">re-order with Alt+arrows</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Showing item overflow on hover</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="6"><a href="https://jetbrains.github.io/ui/controls/tree/">Tree</a></td>
        </tr>
        <tr>
            <td colspan="2">Base</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/principles/speed_search/">Speed Search</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Virtualization</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Tree with checkboxes 🧬</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Showing item overflow on hover</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/tooltip/">Tooltip</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/progress_bar/">Progress Bar</a></td>
            <td>✅</td>
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
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/checkbox/">Checkbox</a></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/button/">Button</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/split_button/">Split Button</a></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/icon_button/">Action Button</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3">Action Button with menu 🧬</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/toolbar/">Action Toolbar</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="3"><a href="https://jetbrains.github.io/ui/controls/menu_list/">Menu List</a> <sup>2</sup></td>
        </tr>
        <tr>
            <td colspan="2">Basic</td>
            <td>✅</td></tr>
        <tr>
            <td colspan="2">Speed search (with input)</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="4"><a href="https://jetbrains.github.io/ui/controls/balloon/">Balloon Notification</a></td>
        </tr>
        <tr>
            <td colspan="2">Basic</td>
            <td>✅</td></tr>
        <tr>
            <td colspan="2">Actions</td>
            <td>✅ (without dropdown)</td>
        </tr>
        <tr>
            <td colspan="2">BalloonsProvider, and useBalloons to imperatively show balloon notifications</td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="5">Action System</td>
        </tr>
        <tr>
            <td colspan="2">Shortcut abstractions (KeyStroke, KeyboardShortcut, etc.)</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-api/src/com/intellij/openapi/actionSystem/CommonShortcuts.java#L56-L56">Common shortcuts</a></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Keymap</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">OS-based keymap</td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/components/popup/">Popup</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="7"><a href="https://jetbrains.github.io/ui/controls/tabs/">Tabs</a></td>
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
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/components/status_bar/">StatusBar</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="19"><a href="https://jetbrains.github.io/ui/components/tool_window/">Tool window</a></td>
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
            <td>✅️</td>
        </tr>
        <tr>
            <td colspan="2">Remove from sidebar action</td>
            <td>️✅</td>
        </tr>
        <tr>
            <td colspan="2">Maximize action</td>
            <td>✅</td>
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
            <td colspan="2">View Mode - Window <sup>4</sup></td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Multiple view with tab switcher in the header</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">Multiple view with dropdown switcher in the header</td>
            <td>❌</td>
        </tr>
        <tr>
            <td colspan="2">Gear icon actions</td>
            <td>✅<sup>5</sup></td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/components/dialog_window/">ModalWindow</a></td>
            <td>✅</td>
        </tr>
    </tbody>

</table>

🧬: higher level "molecule" components that capture a common usage of two or more atomic components, together.

1. Not exactly a list feature. But more about checking feasibility of it
2. It seems in Intellij UI, such menu lists are only used in popups. Maybe only
   FlatSpeedSearchPopup
3. Most probably will not be implemented.
4. Keyboard shortcuts for resizing windows depend on action system implementation and not done yet.
   Also "Remove from sidebar" doesn't fit with how tool windows is implemented at the moment.

[//]: # "TODO: Contribution: - document code generation commands"

### Links

- [Discovered issues in Intellij Platform](./intellij-platform-bugs.md)
