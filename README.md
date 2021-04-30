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
            <td rowspan=9>List</td> 
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
            <td colspan="2">Access to state (selected, focused, disabled)</td>
            <td>:construction:</td>
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
    </tbody>
</table>

1. Not exactly a list feature. But more about checking feasibility of it
2. It seems in Intellij UI, such menu lists are only used in popups. Maybe only 
   FlatSpeedSearchPopup
