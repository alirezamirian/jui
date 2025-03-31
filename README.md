it works!
> [!IMPORTANT]
> This library is a work in progress. 
> The API of components needs to be revisited and made consistent.
> The documentation is incomplete and may contain unreleased features.

- [Demo](https://alirezamirian.github.io/jui/example-app)
- [Storybook](https://alirezamirian.github.io/jui/storybook/)
- [Documentation website](https://alirezamirian.github.io/jui/).

# JUI

JUI is JetBrain's IntelliJ Platform UI implemented as a React.js library. A lot of accessibility aspects are implemented using hooks from [react-aria](https://react-spectrum.adobe.com/react-aria/index.html) and friends.

If you too love the user experience of the JetBrains products, and the developer experience of creating UI applications with react, you may find this interesting.

https://user-images.githubusercontent.com/3150694/232305636-e8b63780-4777-4d27-8a8a-7cbe9d8d4108.mp4

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
            <td rowspan="8"><a href="https://jetbrains.github.io/ui/controls/list/">List</a></td> 
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
            <td colspan="2">Virtualization</td>
            <td>✅</td>
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
            <td>✅</td>
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
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/icon_button/">Icon Button (aka ActionButton)</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3">Icon Button with menu 🧬</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://jetbrains.github.io/ui/controls/toolbar/">Toolbar</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://plugins.jetbrains.com/docs/intellij/drop-down.html">Drop-Down List</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="3"><a href="https://plugins.jetbrains.com/docs/intellij/combo-box.html">Combo Box</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="3"><a href="https://jetbrains.github.io/ui/controls/menu_list/">Menu List</a> <sup>1</sup></td>
        </tr>
        <tr>
            <td colspan="2">Basic</td>
            <td>✅</td></tr>
        <tr>
            <td colspan="2">Speed search</td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="3"><a href="https://jetbrains.github.io/ui/controls/notifications/">Notifications</a></td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/controls/balloon/">Balloon</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/controls/alert/">Alert</a></td>
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
            <td colspan="2">View Mode - Window <sup>2</sup></td>
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
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/components/dialog_window/">ModalWindow</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/controls/alert/">Alert</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="4"><a href="https://jetbrains.github.io/ui/controls/input_field/">InputField</a></td>
        </tr>
        <tr>
            <td colspan="2">Basic support (
               <a href="https://jetbrains.github.io/ui/controls/input_field/#validation">validation</a>, 
               <a href="https://jetbrains.github.io/ui/controls/input_field/#12">label placement</a>, 
               <a href="https://jetbrains.github.io/ui/principles/context_help/">context help</a>, 
               <a href="https://jetbrains.github.io/ui/controls/input_field/#label">disabled</a>)
            </td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/controls/built_in_button/">Built-in buttons</a></td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2"><a href="https://jetbrains.github.io/ui/controls/input_field/#23">Expandable</a></td>
            <td>❌</td>
        </tr>
        <tr>
            <td rowspan="3"><a href="https://jetbrains.github.io/ui/controls/search_field/">SearchField</a></td>
        </tr>
        <tr>
            <td colspan="2">Basic SearchField</td>
            <td>✅</td>
        </tr>
        <tr>
            <td colspan="2">With history popup</td>
            <td>✅</td>
        </tr>
        <tr>
            <td rowspan="1" colspan="3"><a href="https://jetbrains.github.io/ui/controls/link/">Link</a></td>
            <td>✅</td>
        </tr>
    </tbody>

</table>

🧬: higher level "molecule" components that capture a common usage of two or more atomic components, together.

1. It seems in Intellij UI, such menu lists are only used in popups. Maybe only
   FlatSpeedSearchPopup
2. Most probably will not be implemented.

[//]: # "TODO: Contribution: - document code generation commands"

### Links

- [Discovered issues in Intellij Platform](./intellij-platform-bugs.md)
