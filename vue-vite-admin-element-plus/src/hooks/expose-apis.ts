import {
  getCurrentInstance
} from "vue";

export function exposeApis<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy!, apis)
  }
}
