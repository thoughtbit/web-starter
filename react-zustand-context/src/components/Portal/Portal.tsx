import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export type GetContainer = string | HTMLElement | (() => HTMLElement);
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getParent(getContainer: GetContainer) {
  if (!canUseDom()) {
    return null;
  }
  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelectorAll(getContainer)[0];
    }
    if (typeof getContainer === 'function') {
      return getContainer();
    }
    if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
      return getContainer;
    }
  }
  return document.body;
}

export type PortalRef = {};

export interface PortalProps {
  didUpdate?: (prevProps: PortalProps) => void;
  getContainer: () => HTMLElement;
  children?: ReactNode;
}

export const Portal = forwardRef<PortalRef, PortalProps>((props, ref) => {
  const { didUpdate, getContainer, children } = props;

  const parentRef = useRef<HTMLElement | any>();
  const containerRef = useRef<HTMLElement | any>();

  // Ref return nothing, only for wrapper check exist
  useImperativeHandle(ref, () => ({}));

  // Create container in client side with sync to avoid useEffect not get ref
  const initRef = useRef(false);
  if (!initRef.current && canUseDom()) {
    containerRef.current = getContainer();
    parentRef.current = containerRef.current.parentNode;
    initRef.current = true;
  }

  // [Legacy] Used by `rc-trigger`
  useEffect(() => {
    didUpdate?.(props);
  });

  useEffect(() => {
    // Restore container to original place
    // React 18 StrictMode will unmount first and mount back for effect test:
    // https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors
    if (containerRef.current.parentNode === null && parentRef.current !== null) {
      parentRef.current.appendChild(containerRef.current);
    }
    return () => {
      // [Legacy] This should not be handle by Portal but parent PortalWrapper instead.
      // Since some component use `Portal` directly, we have to keep the logic here.
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
});

export default Portal;

/*
<Portal getContainer={this.getContainer} ref={this.componentRef}>
 {children(childProps)}
</Portal>
*/
