# Tree design decisions

## Support for various features

**IMPORTANT**: this is a work in progress. None of these approaches are neither decided nor even explained properly
at the moment.

There are many features to consider for Tree component. And so are different approaches to accommodate for those
features, with their pros and cons in terms of DX both on usage side and internal implementation.

Here is an overview of different features:

- Integration with Speed Search
- Drag and drop
- Selection with Checkboxes. Use cases:
  - Leaves being selectable, parent nodes show three-state selection, and toggle all descendant leaves
  - The same as above, except selection hierarchy is deeper than what is represented in the tree. Example use case
    is Changes tool window, where even the leaves (files) in the tree are parents in a bigger tree where leaves are
    line changes in files. The selection should happen for leaves of that deeper tree.
  - Checkboxes are shown only for the selectable leaves, not the parents. An example is a two level tree, where parents
    are just a simple grouping, and it doesn't make much sense to have "Select all" or "Select none" action for those
    groups, and therefore no checkboxes at parent level. Example: Preferences > Code Style > Typescript > Spaces
- Reordering rows (maybe only for lists?). Example: Scopes editor.

### 1. One component with many options

#### Advantages

- Less complexity in design and architecture

#### Disadvantages

- Simple use cases are subject to a size/performance penalty

### 2. Extensible base component/hook + many wrapper components on top

#### examples

```tsx
<Tree />
<SpeedSearchTree />
<TreeWithCheckboxes /> /* what if you want to have speed search and checkboxes? They seem to be co-existable */
<ReorderableTree /> /* what if you want to have speed search and re-ordering? They seem to be co-existable */
```

#### Advantages

#### Disadvantages

- As the number of features grow, it becomes hard to mix and match features. For each desirable combination, a component
  should be created. The implementation may be minimal since features are abstracted mostly as hooks, that you would
  use and apply the returned props to the different part of the base component. But still the fact that one needs to
  create components like `SpeedSearchTreeWithCheckbox`, or maybe even `ReorderableSpeedSearchWithCheckboxes` seems not
  scalable enough.

### 3. Extensible component + composable with per-feature component

The main component supports some extension points in form of props or context to be provided in wrappers, for
extending the Tree with new features:

- custom key event handling on items (e.g. for selection or re-ordering).
- custom TreeNode component. Useful for nodes with checkbox that should also use a context for reading
  changing checkbox selection state.

#### Examples

Selection:

```tsx
<TreeSelectionProvider selectionTree={{ getChildren, getKey }}>
  {/* ✅ Ability to have a super-tree as selection tree (e.g. in Changes tree) */}
  <Tree items={items}>
    {(item) => (
      <Item
        {/*childNodes, key ...*/}
      >
        <TreeNodeCheckbox node={item} /> {item.title}
        {/* ✅ Ability to conditionally render checkbox */}
      </Item>
    )}
  </Tree>
</TreeSelectionProvider>
```

Re-ordering, or expand/shrink selection

```tsx
const reorderKeyHandler = (event, {selectionManager, collection}) => {
}

// Or a way to connect Actions to tree when action system is implemented. Maybe a way to get the handlers from current
// actions that would act on tree.
const extendOrShrinkSelectionKeyHandler = (event, {selectionManager, collection}) => {
}

<Tree {/*items, children ...*/} keyHandlers={[reorderKeyHandler]}/>
<Tree {/*items, children ...*/} keyHandlers={[extendOrShrinkSelectionKeyHandler]}/>
```

#### Advantages

- No mega interface for props, as smaller components have only props related to a feature.

#### Disadvantages

- if context based extension points are introduced, it can be hard to track who is extending what.
