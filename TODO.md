- refactor: matches in collection search speed should be nullable   
- introduce lerna and another package for an application which uses jui.
  - Add a ProjectViewTree based on Tree component.

- useKeepFocus: When used on a container, it keeps inner focused element focused, even when 
  clicks within the container, and outside the focused element.
  Example: in Settings -> Quick Lists, there are four focusable elements. The left side list,
  the two inputs and the list on the right side. when one of them is focusd, clicking outside
  the settings right panel (the container) doesn't make the focused element lose the focus.
