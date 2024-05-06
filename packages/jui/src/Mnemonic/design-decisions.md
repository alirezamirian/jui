# Mnemonic Technical Design Decisions

## Decision

Instead of requiring a provider component (which would centrally set up keyboard listeners), set up the listeners in
`MnemonicTrigger` directly

### Why

- It makes a simpler API if there is no need to render an app-level provider component to enable mnemonics.
- It's not really a performance concern to set up listeners per mnemonic trigger, considering it doesn't even make
  sense UX-wise to have more than a handful of mnemonics rendered at the same time.

## Problem

In the reference impl, the activation of mnemonics is scoped to the focused window. Since ModalWindow is implemented
as a component rendered within the same browser window, we need to make sure the mnemonics outside the topmost modal
window don't get activated.

## Solution

Standard accessibility properties are used to determine if a mnemonic trigger can be activated or not.

### Why

- There won't be any tight coupling between `ModalWindow` implementation and mnemonics this way. The only thing we rely
  on would be `ModalWindow` following the right accessibility requirements of modal implementation.

### Alternative approaches

- A `MnemonicProvider` component could be exposed to be used in ModalWindow, to define the container element on which
  mnemonic should listen to events. It would have to stop propagation of the mnemonic activation event (`Alt` key).
