import produce from "immer"
import { useState } from "react"
import { without } from "../common/helpers"
import { BrewingScreen } from "./BrewingScreen"
import {
  addIngredientsToBrewingBag,
  addIngredientToCauldron,
  drawIngredients,
  initialGameState,
  resolveIngredientEffect,
} from "./state"
import { StatusHeader } from "./StatusHeader"

export const appSectionCardClass = "p-4 bg-gray-900 rounded-lg"

export function Game() {
  const [state, setState] = useState(initialGameState)

  return (
    <main className="flex flex-col items-center w-full max-w-screen-md gap-4 p-4 mx-auto">
      <StatusHeader state={state} />

      {state.currentScreen === "brewing" && (
        <BrewingScreen
          {...state.brewingScreen}
          onAddIngredient={() => {
            setState((state) => {
              const drawResult = drawIngredients(state, 1)

              const ingredient = drawResult.ingredients[0]
              if (!ingredient) return state

              state = addIngredientToCauldron(drawResult.state, ingredient)
              return resolveIngredientEffect(state, ingredient)
            })
          }}
          onBlueSkullChoice={(choices, choiceIndex) => {
            setState((state) => {
              const choice = choiceIndex != null ? choices[choiceIndex] : null
              const remaining = choice ? without(choices, choice) : choices

              state = addIngredientsToBrewingBag(state, ...remaining)

              if (!choice) {
                return produce(state, (draft) => {
                  draft.brewingScreen.action = { type: "addIngredient" }
                })
              }

              state = addIngredientToCauldron(state, choice)
              state = resolveIngredientEffect(state, choice)
              return state
            })
          }}
        />
      )}
    </main>
  )
}
