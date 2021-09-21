a customized version of @react-aria/selection, which is tailored to match Jetbrains UI behaviour.
The main differences are related to when `selectionMode` is `"multiple"` and `selectOnFocus` is 
`true`. It seems `selectOnFocus` is always true in Jetbrains UI, but it might become an option
in this implementation.
