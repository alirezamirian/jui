- Candidates for unit test in real browser by Cypress (prioritized)
  - Overlay menu (MenuTrigger) focus behaviour:
    - [ ] It should restore the focus when menu is closed by clicking outside or pressing escape, both when a submenu is open or not.
    - [ ] It should move focus to submenu when it's opened so that up/down arrows would navigate submenu items. 
      It should behave the same both when opened by mouse or keyboard.
    - [ ] It should move focus back to the opener menu item, when a submenu is closed, either by escape or arrows
    - [ ] Sub-menu should also adjust its position if not fitted in viewport. opening a submenu close to bottom of the 
          page should not hide menu (because of introducing scrollbar and a scroll event)

- Resizer:
  - [ ] There is a glitch new min size
  
- ToolWindows:
  - [ ] Resize of the split view doesn't work properly. Styles need to be revisited
  - [x] DefaultToolWindow: focus after open
  - [ ] refactor to ToolWindowState to ToolWindowManager
  - [x] how to preserve focus on resize
  - [x] drop index doesn't work fine when dragging the first item enough to 
    be moved to second place. Maybe a regression
  - [x] Stripe collapses when moving the single button in it.
  - [x] bug: click a stripe button. move mouse, it drags the button, even though mouse is not down.
  - [x] start and end padding in Stripe don't seem to be necessary. it's gonna be handled in 
    ToolWindow component


- refactor: matches in collection search speed should be nullable   
- introduce lerna and another package for an application which uses jui.
  - Add a ProjectViewTree based on Tree component.

- Tree
  - [ ] dblclick on non-leaf nodes should toggle. text selection should be disabled.
- useKeepFocus: When used on a container, it keeps inner focused element focused, even when 
  clicks within the container, and outside the focused element.
  Example: in Settings -> Quick Lists, there are four focusable elements. The left side list,
  the two inputs, and the list on the right side. when one of them is focused, clicking outside
  the settings right panel (the container) doesn't make the focused element lose the focus.
