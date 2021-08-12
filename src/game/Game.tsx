import produce from "immer"
import { useState } from "react"
import { BrewingScreen } from "./BrewingScreen"
import {
  addIngredientToBrewingBag,
  addIngredientToCauldron,
  drawIngredients,
  initialGameState,
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

              return addIngredientToCauldron(drawResult.state, ingredient)
            })
          }}
          onBlueSkullChoice={(choices, choiceIndex) => {
            setState((state) => {
              for (const [index, choice] of choices.entries()) {
                if (index !== choiceIndex) {
                  state = addIngredientToBrewingBag(state, choice)
                } else {
                  state = addIngredientToCauldron(state, choice)
                }
              }
              return state
            })
          }}
          onBlueSkullSkip={() => {
            setState(
              produce((draft) => {
                draft.brewingScreen.action = { type: "addIngredient" }
              })
            )
          }}
        />
      )}
    </main>
  )
}
