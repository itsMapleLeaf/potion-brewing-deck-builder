import { useEffect, useRef } from "react"

export function useEffectRef<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}
