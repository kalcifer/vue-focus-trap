export const focusFirstDescendant = (element, focusFn) => {
  for (let i = 0; i < element.childNodes.length; i += 1) {
    const child = element.childNodes[i];
    if (focusFn(child) || focusFirstDescendant(child, focusFn)) {
      return true;
    }
  }
  return false;
};

export const focusLastDescendant = (element, focusFn) => {
  for (let i = element.childNodes.length - 1; i >= 0; i -= 1) {
    const child = element.childNodes[i];
    if (focusFn(child) || focusLastDescendant(child, focusFn)) {
      return true;
    }
  }
  return false;
};

export const isFocusable = element => {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
  ) {
    return true;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return element.type !== "hidden" && element.type !== "file";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
};
