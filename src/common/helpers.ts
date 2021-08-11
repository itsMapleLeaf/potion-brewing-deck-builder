import type { Falsy } from "./types"

export function isTruthy<T>(value: T | Falsy): value is T {
  return !!value
}

export function pickRandom<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
