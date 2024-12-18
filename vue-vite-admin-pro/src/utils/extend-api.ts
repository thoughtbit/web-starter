import { getCurrentInstance } from "vue";

/**
 * 使用
 * const blur = () => { searchInput.value?.blur() };
 * extendAPI({ focus, blur });
 */
export function extendAPI<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance() as any;
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
