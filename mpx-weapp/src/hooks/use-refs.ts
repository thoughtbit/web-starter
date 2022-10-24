import { onBeforeUpdate, ref } from '@mpxjs/core';

export function useRefs() {
  const refs: any = ref<any[]>([]);

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: string) => (el: any) => {
    refs.value[index] = el;
  };

  return { refs, setRefs };
}
