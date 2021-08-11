import clsx from "clsx"
import produce from "immer"
import type { ReactNode } from "react"
import { useState } from "react"
import { randomRange, range } from "../shared/helpers"
import type { Dict } from "../shared/types"
import type { BoardSpace } from "./board-spaces"
import { boardSpaces } from "./board-spaces"

type PieceKind = "green" | "orange" | "white" | "empty"

type Piece = {
  kind: PieceKind
  value: number
}

type GameState = {
  bag: Array<Piece>
  cauldron: Array<Piece>
}

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

const cherryBombLimit = 7

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

        const emptySpaces = range(0, piece.value - 1).map<Piece>(() => ({
          kind: "empty",
          value: 0,
        }))
        draft.cauldron.push(...emptySpaces, piece)
      })
    )
  }

  return (
    <main className="flex flex-col items-center w-full max-w-screen-md gap-4 p-4 mx-auto">
      <section className="flex flex-col items-center p-4 text-center bg-gray-900 rounded-lg">
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
          {boardSpaces.map((space, index) => {
            const piece = state.cauldron[index]
            return (
              <CauldronSpace key={index} space={space}>
                {piece && <IngredientTile piece={piece} />}
              </CauldronSpace>
            )
          })}
        </section>
      </section>
    </main>
  )
}

function CauldronSpace({
  space,
  children,
}: {
  space: BoardSpace
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col w-20 h-20 bg-gray-800 rounded shadow bg-gray">
      <p className="flex justify-between mx-1.5 mt-1.5 font-medium leading-none">
        <span title={`Gives you ${space.shopPoints} point(s) for shopping`}>
          {space.shopPoints}
        </span>

        {space.victoryPoints > 0 && (
          <span
            title={`Gives you ${space.victoryPoints} victory point(s)`}
            className="inline-block w-4 h-4 text-gray-800 bg-yellow-200"
          >
            {space.victoryPoints}
          </span>
        )}
      </p>

      <div className="self-center mt-1">{children}</div>

      {space.hasRuby && (
        <div className="absolute text-red-400 right-1.5 bottom-1.5">
          <CubeIcon />
        </div>
      )}
    </div>
  )
}

function IngredientTile({ piece }: { piece: Piece }) {
  const colorClasses: Dict<string, PieceKind> = {
    green: clsx`bg-green-600 text-white`,
    orange: clsx`bg-yellow-600 text-white`,
    white: clsx`bg-white text-gray-700`,
  }

  if (piece.kind === "empty") return null

  return (
    <div
      title={`${piece.kind} ${piece.value}`}
      className={clsx(
        "flex items-center justify-center w-10 h-10 rounded-full shadow font-bold text-lg",
        colorClasses[piece.kind]
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

function CubeIcon({
  size = 5,
  inline,
}: {
  size?: 4 | 5 | 6
  inline?: boolean
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx(
        size === 4 && "w-4 h-4",
        size === 5 && "w-5 h-5",
        size === 6 && "w-6 h-6",
        inline && "inline-block"
      )}
    >
      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
    </svg>
  )
}
