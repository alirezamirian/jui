- SpeedSearchTree
- Implement a Theme class:
  - themeJson is kept as a property on it
  - getValue method for accessing value based on path (e.g. "Slider.tickColor"). it resolves OS 
    sensitive values.
  - getColor method for accessing color value based on path. It handles refs to colors.
  - getIcon async method for resolving icon to svg. There might be different Theme implementations
    with different ways for resolving icons (fetching from Github, with support for preloading, 
    loading SVGs from fs, etc.)
  - passing fallback is supported in both getValue and higher-level methods.
- introduce lerna and another package for an application which uses jui.
  - Add a ProjectViewTree based on Tree component.

- useKeepFocus: When used on a container, it keeps inner focused element focused, even when 
  clicks within the container, and outside the focused element.
  Example: in Settings -> Quick Lists, there are four focusable elements. The left side list,
  the two inputs and the list on the right side. when one of them is focusd, clicking outside
  the settings right panel (the container) doesn't make the focused element lose the focus.
