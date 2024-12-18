import { unref, type Ref } from 'vue'

import { useEventListener } from './use-event-listener'
import { isBrowser } from '@/utils/is'


export type UseClickOutsideTarget = Element | Ref<Element | undefined | null>

export function useClickOutside(target: UseClickOutsideTarget, type: string, listener: EventListener) {
  if (!isBrowser()) {
    return
  }

  const handler = (event: Event) => {
    const element = unref(target)

    if (element && !element.contains(event.target as Node)) {
      listener(event)
    }
  }

  useEventListener(document, type, handler)
}
