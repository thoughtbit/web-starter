import { isBrowser } from "@/utils/dom"
import { useEffect, useLayoutEffect } from "react"

export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect