import { useMemo } from "react"

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return

  if (typeof ref === "function") {
    ref(value)
    return
  }

  try {
    // @ts-ignore
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

/**
 * React hook that merges react refs into a single memoized function
 */
export function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node)
      })
    }
  }, refs)
}

/*
const Component = React.forwardRef((props, ref) => {
   const internalRef = React.useRef()
   const refs = useMergeRefs(internalRef, ref)
   return <div {...props} ref={refs} />;
});
*/

/*
const Example = ({ ref, ...props }) => {
  const internalRef = React.useRef()
  const refs = useMergeRefs(internalRef, ref)

  return (
    <div {...props} ref={refs}>
      A div with multiple refs.
    </div>
  )
}
*/