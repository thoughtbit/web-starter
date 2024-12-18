import { Provider } from 'jotai'
import type { PropsWithChildren } from 'react'
import { jotaiStore } from '../lib/store'

export const JotaiStoreProvider: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Provider store={jotaiStore}>
      {props.children}
    </Provider>
  )
}
