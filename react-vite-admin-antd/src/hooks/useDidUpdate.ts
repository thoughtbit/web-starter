import { useEffect, useRef, EffectCallback } from "react";

export function useDidUpdate(fn: EffectCallback, dependencies?: any[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      fn();
    } else {
      mounted.current = true;
    }
  }, dependencies);
}

/*
// 钩子
useDidUpdate(() => console.log("Won't be called when mounted"), [value]);

// 原生的
const mounted = useRef(false);
useEffect(() => {
  if (mounted.current) {
    fn();
  } else {
    mounted.current = true;
  }
}, dependencies);
*/