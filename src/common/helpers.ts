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

export function removeRandomItems<T>(items: (T | undefined)[], count = 1): T[] {
  const removedItems: T[] = []
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * items.length)
    const item = items.splice(index, 1)[0]
    if (item !== undefined) {
      removedItems.push(item)
    }
  }
  return removedItems
}
