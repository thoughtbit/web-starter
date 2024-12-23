import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';

const useBeforeunload = (handler: any) => {
  invariant(handler == null || typeof handler === 'function', 'Expected `handler` to be a function');

  const eventListenerRef = useRef<any>();

  useEffect(() => {
    eventListenerRef.current = (event: any) => {
      const returnValue = handler?.(event);
      // Handle legacy `event.returnValue` property
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      if (typeof returnValue === 'string') {
        return (event.returnValue = returnValue);
      }
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
      if (event.defaultPrevented) {
        return (event.returnValue = '');
      }
    };
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => eventListenerRef.current(event);
    window.addEventListener('beforeunload', eventListener);
    return () => {
      window.removeEventListener('beforeunload', eventListener);
    };
  }, []);
};

export default useBeforeunload;

/*
useBeforeunload(() => 'You have unsaved changes, are you sure?');
*/