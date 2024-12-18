import { useRef, useReducer, useCallback } from 'react'
import { useUnmountEffect } from './useUnmountEffect'

export const useForceUpdate = () => {
  const unMountRef = useRef(false)
  const [trigger, dispatch] = useReducer((v) => !v, false)

  useUnmountEffect(() => {
    unMountRef.current = true
  })

  const forceUpdate = useCallback(() => {
    if (unMountRef.current) return
    dispatch()
  }, [])

  return [forceUpdate, trigger] as const
}

/*
  const [forceUpdate] = useForceUpdate()

  useLayoutEffect(() => {
    if (!doc) return

    forceUpdate()

    return ()
  }, [doc, forceUpdate])
*/