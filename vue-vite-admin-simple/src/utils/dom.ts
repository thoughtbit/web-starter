import { VNode } from "vue";
import { isString } from "./is";

const trim = (str: string): string => (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");

export const NOOP = () => {
  return undefined;
};

export const isServer = (() => {
  try {
    return !(typeof window !== "undefined" && document !== undefined);
  } catch (e) {
    return true;
  }
})();

export const on = ((): any => {
  // @ts-ignore
  if (!isServer && document.addEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event && handler) {
      (element as any).attachEvent(`on${event}`, handler);
    }
  };
})();

export const off = ((): any => {
  // @ts-ignore
  if (!isServer && document.removeEventListener) {
    return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (element: Node, event: string, handler: EventListenerOrEventListenerObject): any => {
    if (element && event) {
      (element as any).detachEvent(`on${event}`, handler);
    }
  };
})();

export function once(element: Node, event: string, handler: EventListenerOrEventListenerObject) {
  const handlerFn = typeof handler === "function" ? handler : handler.handleEvent;
  const callback = (evt: any) => {
    handlerFn(evt);
    off(element, event, callback);
  };

  on(element, event, callback);
}

export function hasClass(el: Element, cls: string): any {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}

export function addClass(el: Element, cls: string): any {
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
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: string): any {
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
    el.className = trim(curClass);
  }
}

export const findDomNode = (vnode: VNode) => {
  let node = vnode.el;
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node as HTMLElement;
};

export const contains = (root: Node, ele: Node) => {
  let node: Node | null = ele;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

export const OVERLAY_TYPES = ["modal", "message", "notification"] as const;

export const getOverlay = (type: typeof OVERLAY_TYPES[number]) => {
  const popper = document.createElement("div");
  popper.setAttribute("class", `arco-overlay arco-overlay-${type}`);
  return popper;
};

export const querySelector = (selectors: string) => {
  if (isServer) {
    return NOOP();
  }
  return document.querySelector(selectors) as HTMLElement | undefined | null;
};

export const getElement = (target: string | HTMLElement | undefined | null) => {
  if (isString(target)) return querySelector(target);
  return target || undefined;
};

/**
 * Get the relative distance between two DOMs
 * @param target
 * @param relative
 */
export const getRelativeRect = (target: HTMLElement, relative: HTMLElement) => {
  const targetRect = target.getBoundingClientRect();
  const relativeRect = relative.getBoundingClientRect();

  return {
    top: targetRect.top - relativeRect.top,
    bottom: relativeRect.bottom - targetRect.bottom,
    left: targetRect.left - relativeRect.left,
    right: relativeRect.right - targetRect.right,
    width: targetRect.width,
    height: targetRect.height,
  };
};

export const getScrollBarWidth = (element: HTMLElement) => {
  return element.tagName === "BODY"
    ? window.innerWidth - (document.documentElement.offsetWidth || document.body.offsetWidth)
    : element.offsetWidth - element.clientWidth;
};
