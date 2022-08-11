import { useEffect } from "react";
import { useDidUpdate } from "./useDidUpdate";

export function useLogger(componentName: string, props: any[]) {
  useEffect(() => {
    console.log(`${componentName} mounted`, ...props);
    return () => console.log(`${componentName} unmounted`);
  }, []);

  useDidUpdate(() => {
    console.log(`${componentName} updated`, ...props);
  }, props);

  return null;
}

export default useLogger;

/*
import { useState } from 'react';
import { useLogger } from '@/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <button onClick={() => setCount((c) => c + 1)}>Update state ({count})</button>;
}
*/
