import clsx from "clsx"
import produce from "immer"
import type { ReactNode } from "react"
import { useState } from "react"
import { randomRange } from "../shared/helpers"

type Piece = {
  color: "green" | "orange" | "white"
  value: number
}

const initialState = {
  bag: [
    { color: "green", value: 1 },
    { color: "orange", value: 1 },
    { color: "white", value: 1 },
    { color: "white", value: 1 },
    { color: "white", value: 1 },
    { color: "white", value: 1 },
    { color: "white", value: 2 },
    { color: "white", value: 2 },
    { color: "white", value: 3 },
  ] as Piece[],
  cauldron: [] as Piece[],
}

export function App() {
  const [state, setState] = useState(initialState)

  const cherryCount = state.cauldron
    .filter(({ color }) => color === "white")
    .reduce((count, { value }) => count + value, 0)

  function reset() {
    setState(initialState)
  }

  function drawPiece() {
    setState(
      produce((draft) => {
        const index = randomRange(0, draft.bag.length - 1)
        const [piece] = draft.bag.splice(index, 1)
        if (piece) {
          draft.cauldron.push(piece)
        }
      })
    )
  }

  return (
    <main className="flex flex-col items-center w-full max-w-screen-md gap-4 p-4 mx-auto">
      <section className="flex gap-2">
        <SolidButton onClick={drawPiece}>Add ingredient</SolidButton>
        <SolidButton onClick={reset}>Reset</SolidButton>
      </section>
      <h1>Cauldron</h1>
      <p>cherry count: {cherryCount}</p>
      <section className="flex gap-3">
        {state.cauldron.map((piece, index) => (
          <IngredientTile key={index} piece={piece} />
        ))}
      </section>
    </main>
  )
}

function IngredientTile({ piece }: { piece: Piece }) {
  const colorClasses: Record<Piece["color"], string> = {
    green: clsx`bg-green-500 text-white`,
    orange: clsx`bg-yellow-500 text-white`,
    white: clsx`bg-white text-gray-700`,
  }

  return (
    <div
      title={`${piece.color} ${piece.value}`}
      className={clsx(
        "flex items-center justify-center w-10 h-10 rounded-full shadow font-medium",
        colorClasses[piece.color]
      )}
    >
      {piece.value}
    </div>
  )
}

function SolidButton(props: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      {...props}
      className="px-3 py-2 font-medium text-white transition bg-blue-600 rounded shadow hover:bg-blue-700"
    />
  )
}
