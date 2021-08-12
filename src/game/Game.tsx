import produce from "immer"
import { useState } from "react"
import { randomRange } from "../common/helpers"
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
                const index = randomRange(0, draft.brewingScreen.bag.length - 1)
                const [piece] = draft.brewingScreen.bag.splice(index, 1)
                if (!piece) return

                for (const _ of range(0, piece.value - 1)) {
                  draft.brewingScreen.cauldron.push({ kind: "empty", value: 0 })
                }
                draft.brewingScreen.cauldron.push(piece)
              })
            )
          }}
        />
      )}
    </main>
  )
}
