import {
  focusFirstDescendant,
  focusLastDescendant,
  isFocusable
} from "./helpers";

describe("focusFirstDescendant", () => {
  it("returns false if element has no childNodes", () => {
    const el = document.createElement("div");
    const focusFn = () => true;
    expect(focusFirstDescendant(el, focusFn)).not.toBeTruthy();
  });

  it("returns true if focusFn returns true", () => {
    const el = document.createElement("div");
    el.appendChild(document.createElement("div"));
    const focusFn = () => true;
    expect(focusFirstDescendant(el, focusFn)).toBeTruthy();
  });

  it("returns false if focusFn returns false", () => {
    const el = document.createElement("div");
    el.appendChild(document.createElement("div"));
    const focusFn = () => false;
    expect(focusFirstDescendant(el, focusFn)).not.toBeTruthy();
  });

  it("calls recursively", () => {
    const el = document.createElement("div");
    const child = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button";
    child.appendChild(button);
    el.appendChild(child);
    const focusFn = element => element.id === "button";
    expect(focusFirstDescendant(el, focusFn)).toBeTruthy();
  });
});

describe("focusLastDescendant", () => {
  it("returns false if element has no childNodes", () => {
    const el = document.createElement("div");
    const focusFn = () => true;
    expect(focusLastDescendant(el, focusFn)).not.toBeTruthy();
  });

  it("returns true if focusFn returns true", () => {
    const el = document.createElement("div");
    el.appendChild(document.createElement("div"));
    const focusFn = () => true;
    expect(focusLastDescendant(el, focusFn)).toBeTruthy();
  });

  it("returns false if focusFn returns false", () => {
    const el = document.createElement("div");
    el.appendChild(document.createElement("div"));
    const focusFn = () => false;
    expect(focusLastDescendant(el, focusFn)).not.toBeTruthy();
  });

  it("calls recursively", () => {
    const el = document.createElement("div");
    const child = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button";
    child.appendChild(button);
    el.appendChild(child);
    const focusFn = element => element.id === "button";
    expect(focusLastDescendant(el, focusFn)).toBeTruthy();
  });
});

describe("isFocusable", () => {
  describe("returns false when", () => {
    it("element is disabled", () => {
      const el = document.createElement("button");
      el.disabled = true;
      expect(isFocusable(el)).not.toBeTruthy();
    });

    it("element is not one of a, button, input, select, textarea elements", () => {
      const el = document.createElement("div");
      expect(isFocusable(el)).not.toBeTruthy();
    });

    it("element is an anchor tag but does not have a href attribute", () => {
      const el = document.createElement("a");
      expect(isFocusable(el)).not.toBeTruthy();
    });

    it("element is an a tag but has a rel=ignore attribute", () => {
      const el = document.createElement("a");
      el.rel = "ignore";
      expect(isFocusable(el)).not.toBeTruthy();
    });

    it("element is an input tag & type=hidden", () => {
      const el = document.createElement("input");
      el.type = "hidden";
      expect(isFocusable(el)).not.toBeTruthy();
    });

    it("element is an input tag & type=file", () => {
      const el = document.createElement("input");
      el.type = "file";
      expect(isFocusable(el)).not.toBeTruthy();
    });
  });

  describe("returns true when", () => {
    it("element has tabindex=0", () => {
      const el = document.createElement("div");
      el.tabIndex = 0;
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element has tabindex greater than 0", () => {
      const el = document.createElement("div");
      el.tabIndex = 1;
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element is a button", () => {
      const el = document.createElement("button");
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element is a select", () => {
      const el = document.createElement("select");
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element is an input", () => {
      const el = document.createElement("input");
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element is an textarea", () => {
      const el = document.createElement("textarea");
      expect(isFocusable(el)).toBeTruthy();
    });

    it("element is an anchor tag & has a href attribute & does not have a rel=ignore attribute", () => {
      const el = document.createElement("a");
      el.href = "http://example.com";
      expect(isFocusable(el)).toBeTruthy();
    });
  });
});
