export type Ingredient = {
  kind: IngredientKind
  value: number
}

export type IngredientKind =
  | "empty"
  | "water"
  | "green"
  | "orange"
  | "white"
  | "blue"
  | "yellow"
