export type Ingredient = {
  kind: IngredientKind
  value: number
}

export type IngredientKind = "water" | "green" | "orange" | "white" | "empty"
