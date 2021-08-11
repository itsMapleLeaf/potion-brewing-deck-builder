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

type RangeArgs =
  | [end: number]
  | [start: number, end: number]
  | [start: number, end: number, step: number]

function* generateRange(...args: RangeArgs): Generator<number> {
  let start: number
  let end: number
  let step = 1

  if (args.length === 1) {
    ;[start, end] = [0, args[0]]
  } else if (args.length === 2) {
    ;[start, end] = args
  } else {
    ;[start, end, step] = args
  }

  for (let i = start; i < end; i += step) {
    yield i
  }
}

export function range(...args: RangeArgs): number[] {
  return Array.from(generateRange(...args))
}
