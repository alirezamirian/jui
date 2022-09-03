# Notes about component testing with cypress

## mouse/pointer interactions

### Problem: `trigger` doesn't work

Using `trigger` command for mouseenter, pointerenter, etc. doesn't work as expected. If the handler is set up via react
props, it doesn't work for some reason (maybe event delegation). Some workarounds are tested and none worked out.

### Solution

The solution is to use commands like `realHover` from [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) plugin.

### Problem: behaviour difference between `realHover` and real hover!

In react-aria, there is a check on [focus visibility](https://react-spectrum.adobe.com/react-aria/useFocusVisible.html),
in some places that `useHover` is used. In a way that hover start handler logic is avoided if focus is visible.
When real hover happens, some mouse events are triggered which in turn makes `isFocusVisible` returns false. While
in `realHover` command, that doesn't happen and `isFocusVisible` will return true.

More details: `currentModality` is maintained in `@react-aria/interactions`, based on mouse and keyboard events.
It's `null` by default. When real hover happens, some events are triggered, and `currentModality` is set to 'pointer'.
It doesn't happen for some reason when `realHover` command is used.

**UPDATE**: It seemed the order of handlers are for some reason different when hover event is triggered via `realHover`.
So that in the first `onPointerEnter` event handler in `useHover`, `currentModality` is not set. But then the global
handler in `@react-aria/interactions` is immediately invoked, setting `currentModality`. That's why the following
workaround works.

### Solution

Add `cy.get('body').click()` before the `realHover` command. It will make `isFocusVisible` return false.
In some other cases, calling `realHover` on some other element (even `body`) can fix the issue. Note that calling
`realHover` on the target element multiple times doesn't work, because `pointerEnter` will only be triggered the first
time.

## Image snapshot comparison on headless vs headed

Screenshots on headless mode is rendered slightly different compared to headed mode. This could be related to Electron
being used by default in headless mode while chrome is used in headed mode. But even the same browser renders differently
in headed and headless modes. At least that's the case for Chrome.

### Solution

Threshold in pixel comparison is hard coded to 0.01 in cypress-plugin-snapshots. This value doesn't work very well
with the rendering differences of different browsers and/or headless and headed modes.
[There is no option for it](https://github.com/meinaart/cypress-plugin-snapshots/issues/131) in the latest release
of `cypress-plugin-snapshots` (v1.4.4). A patch is used for now to change `pixelmatch` threshold **from 0.01 to 0.1**.
