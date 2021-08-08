import type { Falsy } from "./types"

export function isTruthy<T>(value: T | Falsy): value is T {
  return !!value
}
