export type Falsy = false | undefined | null | 0 | ""

export type Dict<Value, Key extends PropertyKey = PropertyKey> = Partial<
  Record<Key, Value>
>
