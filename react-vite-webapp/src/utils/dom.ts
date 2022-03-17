const isServer = typeof window === "undefined";

const trim = (str: string): string =>
  (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");

export const on = ((): any => {
  if (!isServer && document.addEventListener) {
    return (
      element: Node,
      event: string,
      handler: EventListenerOrEventListenerObject
    ): any => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (
    element: Node,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): any => {
    if (element && event && handler) {
      (element as any).attachEvent(`on${event}`, handler);
    }
  };
})();

export const off = ((): any => {
  if (!isServer && document.removeEventListener) {
    return (
      element: Node,
      event: string,
      handler: EventListenerOrEventListenerObject
    ): any => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (
    element: Node,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): any => {
    if (element && event) {
      (element as any).detachEvent(`on${event}`, handler);
    }
  };
})();

function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}

export const addClass = function (el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    // eslint-disable-next-line
    el.className = curClass;
  }
};

export const removeClass = function (el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, " ");
    }
  }
  if (!el.classList) {
    // eslint-disable-next-line
    el.className = trim(curClass);
  }
};
