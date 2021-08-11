import produce from "immer"
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

  function reset() {
    setState(initialState)
  }

  function drawPiece() {
    setState(
      produce((draft) => {
        const index = randomRange(0, draft.bag.length - 1)
        const [piece] = draft.bag.splice(index, 1)
        draft.cauldron.push(piece)
      })
    )
  }

  const cherryCount = state.cauldron
    .filter(({ color }) => color === "white")
    .reduce((count, { value }) => count + value, 0)

  return (
    <main>
      <button onClick={drawPiece}>Add ingredient</button>
      <button onClick={reset}>Reset</button>
      <h1>Cauldron</h1>
      <p>cherry count: {cherryCount}</p>
      <ol>
        {state.cauldron.map(
          (piece, index) =>
            piece && (
              <li key={index}>
                {piece.color} {piece.value}
              </li>
            )
        )}
      </ol>
    </main>
  )
}
