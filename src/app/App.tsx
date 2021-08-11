import clsx from "clsx"
import produce from "immer"
import { useState } from "react"
import { cauldronSpaces } from "../cauldron/cauldron-space"
import { CauldronSpaceTile } from "../cauldron/CauldronSpaceTile"
import { randomRange } from "../common/helpers"
import { range } from "../common/range"
import { IngredientTile } from "../ingredient/IngredientTile"
import type { Ingredient } from "../ingredient/types"
import { SolidButton } from "../ui/SolidButton"

type GameState = {
  bag: Ingredient[]
  cauldron: Ingredient[]
}

const cherryBombLimit = 7

const initialState: GameState = {
  bag: [
    { kind: "green", value: 1 },
    { kind: "orange", value: 1 },
    { kind: "white", value: 1 },
    { kind: "white", value: 1 },
    { kind: "white", value: 1 },
    { kind: "white", value: 1 },
    { kind: "white", value: 2 },
    { kind: "white", value: 2 },
    { kind: "white", value: 3 },
  ],
  cauldron: [],
}

export function App() {
  const [state, setState] = useState(initialState)

  const cherryValue = state.cauldron
    .filter((piece) => piece.kind === "white")
    .reduce((count, piece) => count + piece.value, 0)

  function getCherryBombLimitClass() {
    if (cherryValue <= cherryBombLimit - 3) return clsx`text-blue-400`
    if (cherryValue <= cherryBombLimit - 1) return clsx`text-yellow-400`
    return clsx`text-red-400`
  }

  function reset() {
    setState(initialState)
  }

  function drawPiece() {
    setState(
      produce((draft) => {
        const index = randomRange(0, draft.bag.length - 1)
        const [piece] = draft.bag.splice(index, 1)
        if (!piece) return

        for (const _ of range(0, piece.value - 1)) {
          draft.cauldron.push({ kind: "empty", value: 0 })
        }
        draft.cauldron.push(piece)
      })
    )
  }

  return (
    <main className="flex flex-col items-center w-full max-w-screen-md gap-4 p-4 mx-auto">
      <div className="flex flex-col items-center p-4 text-center bg-gray-900 rounded-lg">
        <h1 className="mb-2 text-2xl font-light">Cauldron</h1>

        <p className={getCherryBombLimitClass()}>
          Cherry bomb limit: {cherryValue}/{cherryBombLimit}
        </p>

        <p>Remaining ingredients: {state.bag.length}</p>

        <section className="flex gap-2 mt-4">
          <SolidButton onClick={drawPiece}>Add ingredient</SolidButton>
          <SolidButton onClick={reset}>Reset</SolidButton>
        </section>

        <section className="flex flex-wrap justify-center gap-3 mt-6">
          {cauldronSpaces.map((space, index) => {
            const piece = state.cauldron[index]
            return (
              <CauldronSpaceTile key={index} space={space}>
                {piece && <IngredientTile piece={piece} />}
              </CauldronSpaceTile>
            )
          })}
        </section>
      </div>
    </main>
  )
}
