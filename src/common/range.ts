type RangeArgs =
  | [end: number]
  | [start: number, end: number]
  | [start: number, end: number, step: number]

export function* range(...args: RangeArgs): Generator<number> {
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

export function rangeArray(...args: RangeArgs): number[] {
  return Array.from(range(...args))
}
