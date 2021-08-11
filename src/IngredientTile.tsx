import clsx from "clsx"
import type { Dict } from "../shared/types"
import type { Piece, PieceKind } from "./piece"

export function IngredientTile({ piece }: { piece: Piece }) {
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
