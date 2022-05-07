import { ref, readonly } from "vue";
import type { Ref } from "vue";

export function useState<T>(defaultValue?: T): [Ref<T>, (newValue: T) => void] {
  const value = ref(defaultValue) as Ref<T>;
  const setValue = (newValue: T) => {
    value.value = newValue;
  };

  return [readonly(value) as Ref<T>, setValue];
}
