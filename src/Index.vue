<script>
import {
  focusFirstDescendant,
  focusLastDescendant,
  isFocusable
} from "./helpers";

export default {
  name: "FocusTrap",
  props: {
    initialFocus: {
      type: Function
    },
    isActive: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      ignoreFocusChange: false,
      lastFocus: null
    };
  },
  computed: {
    tabIndex() {
      return this.isActive ? 0 : -1;
    }
  },
  watch: {
    isActive() {
      this.manageFocus();
    }
  },
  mounted() {
    this.manageFocus();
  },
  beforeDestroy() {
    this.manageFocus();
  },
  methods: {
    attemptFocus(element) {
      if (!isFocusable(element)) {
        return false;
      }
      this.ignoreFocusChange = true;
      try {
        element.focus();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      this.ignoreFocusChange = false;
      return document.activeElement === element;
    },
    getChildEl() {
      return this.$refs.child;
    },
    getRootEl() {
      return this.$refs.root;
    },
    manageFocus() {
      const rootEl = this.getRootEl();
      if (this.value) {
        rootEl.addEventListener("focus", this.trapFocus, true);
        if (this.initialFocus && this.initialFocus().focus) {
          this.initialFocus().focus();
        } else {
          focusFirstDescendant(this.getChildEl(), this.attemptFocus);
        }
        this.lastFocus = document.activeElement;
      } else {
        rootEl.removeEventListener("focus", this.trapFocus, true);
      }
    },
    trapFocus(evt) {
      if (this.ignoreFocusChange) {
        return;
      }
      const childEl = this.getChildEl();
      if (childEl.contains(evt.target)) {
        this.lastFocus = evt.target;
      } else {
        focusFirstDescendant(childEl, this.attemptFocus);
        if (this.lastFocus === document.activeElement) {
          focusLastDescendant(childEl, this.attemptFocus);
        }
        this.lastFocus = document.activeElement;
      }
    }
  }
};
</script>

<template>
  <div ref="root">
    <div v-bind:tabindex="tabIndex"></div>
    <div ref="child">
      <slot></slot>
    </div>
    <div v-bind:tabindex="tabIndex"></div>
  </div>
</template>
