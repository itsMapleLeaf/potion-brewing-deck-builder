import produce from "immer"
import { useState } from "react"
import { removeRandomItems } from "../common/helpers"
import { range } from "../common/range"
import { BrewingScreen } from "./BrewingScreen"
import { initialGameState } from "./state"
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
            setState(
              produce((draft) => {
                const [piece] = removeRandomItems(draft.brewingScreen.bag)
                if (!piece) return

                for (const _ of range(0, piece.value - 1)) {
                  draft.brewingScreen.cauldron.push({ kind: "empty", value: 0 })
                }
                draft.brewingScreen.cauldron.push(piece)

                if (piece.kind === "blue") {
                  const choices = removeRandomItems(
                    draft.brewingScreen.bag,
                    piece.value
                  )

                  draft.brewingScreen.action = {
                    type: "blueSkullChooseIngredient",
                    choices,
                  }
                } else {
                  draft.brewingScreen.action = { type: "addIngredient" }
                }
              })
            )
          }}
          onBlueSkullChoice={(choices, choiceIndex) => {
            setState(
              produce((draft) => {
                for (const [index, choice] of choices.entries()) {
                  if (index === choiceIndex) {
                    const piece = choice

                    for (const _ of range(0, piece.value - 1)) {
                      draft.brewingScreen.cauldron.push({
                        kind: "empty",
                        value: 0,
                      })
                    }

                    draft.brewingScreen.cauldron.push(choice)

                    if (piece.kind === "blue") {
                      const choices = removeRandomItems(
                        draft.brewingScreen.bag,
                        piece.value
                      )

                      draft.brewingScreen.action = {
                        type: "blueSkullChooseIngredient",
                        choices,
                      }
                    } else {
                      draft.brewingScreen.action = { type: "addIngredient" }
                    }
                  } else {
                    draft.brewingScreen.bag.push(choice)
                  }
                }
              })
            )
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
