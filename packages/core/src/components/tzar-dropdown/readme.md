# tzar-dropdown

Adds open/close behavior to markup you write yourself. It renders no markup or
styles of its own, only two slots.

- **Trigger:** the child with `slot="trigger"`, normally a
  `<button type="button">`.
- **Menu:** the first child without a `slot`, for example a `<ul>`.

`tzar-dropdown` owns these attributes, so don't set them yourself:

- `aria-expanded` and `aria-controls` on the trigger
- `hidden` on the menu
- `id` on the menu, only when it has none

Clicking the trigger toggles the menu. Escape and a click outside close it, and
Escape moves focus back to the trigger.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                  | Default     |
| -------- | --------- | ----------- | --------------------- | ----------- |
| `label`  | `label`   |             | `string \| undefined` | `undefined` |
| `open`   | `open`    |             | `boolean`             | `false`     |


## Events

| Event        | Description | Type                   |
| ------------ | ----------- | ---------------------- |
| `openChange` |             | `CustomEvent<boolean>` |


## Slots

| Slot        | Description      |
| ----------- | ---------------- |
|             | The default slot |
| `"trigger"` |                  |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"menu"`    |             |
| `"trigger"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
