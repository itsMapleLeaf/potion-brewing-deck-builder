export type Ingredient = {
  kind: IngredientKind
  value: number
}

export type IngredientKind = "green" | "orange" | "white" | "empty"
