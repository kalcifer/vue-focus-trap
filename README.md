# vue-focus-trap

A component for [Vue][1] that traps user focus within a DOM element.

## Installation

Install via npm:

```bash
% npm install vue-focus-trap
```

## Usage

```javascript
import FocusTrap from "vue-focus-trap";
```

```javascript
<FocusTrap v-bind:is-active="true">
  <Dialog />
</FocusTrap>
```

When `isActive` becomes true, it activates the focus trap. By default it sets the focus to the first focusable element within the component. This can be overriden with the `initialFocus` prop.

### Props

- `isActive`: `boolean`
- `initialFocus`: `(() => Element)` _function returning an Element_

[1]: https://vuejs.org
