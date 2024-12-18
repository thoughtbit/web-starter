import { type InjectionKey, inject, provide } from 'vue'

/**
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 *
 * There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
 *
 * @param contextName The description for injection key symbol.
 */
export function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string,
) {
  const symbolDescription
    = typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> = Symbol(symbolDescription)

  /**
   * @param fallback The context value to return if the injection fails.
   *
   * @throws When context injection failed and no fallback is specified.
   * This happens when the component injecting the context is not a child of the root component providing the context.
   */
  const injectContext = <
    T extends ContextValue | null | undefined = ContextValue,
  >(
      fallback?: T,
    ): T extends null ? ContextValue | null : ContextValue => {
    const context = inject(injectionKey, fallback)
    if (context)
      return context

    if (context === null)
      return context as any

    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${
        Array.isArray(providerComponentName)
          ? `one of the following components: ${providerComponentName.join(
              ', ',
            )}`
          : `\`${providerComponentName}\``
      }`,
    )
  }

  const provideContext = (contextValue: ContextValue) => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}

/*
<script lang="ts">
import type { Direction, ScrollBodyOption } from '@/shared/types'
import type { Ref } from 'vue'
import { createContext } from '@/shared'

interface ConfigProviderContextValue {
  dir?: Ref<Direction>
  scrollBody?: Ref<boolean | ScrollBodyOption>
  useId?: () => string
}

export const [injectConfigProviderContext, provideConfigProviderContext]
  = createContext<ConfigProviderContextValue>('ConfigProvider')

export interface ConfigProviderProps {
  // The global reading direction of your application. This will be inherited by all primitives.
  dir?: Direction
  // The global scroll body behavior of your application. This will be inherited by the related primitives.
  scrollBody?: boolean | ScrollBodyOption

  //  The global `useId` injection as a workaround for preventing hydration issue.
  useId?: () => string
}
</script>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: 'ltr',
  scrollBody: true,
  useId: undefined,
})

const { dir, scrollBody } = toRefs(props)

provideConfigProviderContext({
  dir,
  scrollBody,
  useId: props.useId,
})
</script>

<template>
  <slot />
</template>
*/
/*
export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectConfigProviderContext({
    dir: ref('ltr'),
  })
  return computed(() => dir?.value || context.dir?.value || 'ltr')
}
*/
