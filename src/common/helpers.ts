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

export function pickRandomItems<T>(
  items: T[],
  count = 1,
): {
  chosenItems: T[]
  remainingItems: T[]
} {
  const chosenItems: T[] = []
  const remainingItems: T[] = [...items]

  for (let i = 0; i < count; i++) {
    const [item] = remainingItems.splice(
      randomRange(0, remainingItems.length - 1),
      1,
    )
    if (item !== undefined) {
      chosenItems.push(item)
    }
  }

  return { chosenItems, remainingItems }
}
