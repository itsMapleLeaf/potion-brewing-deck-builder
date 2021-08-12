import clsx from "clsx"
import type { Dict } from "../common/types"
import { DropletIcon } from "../ui/DropletIcon"
import type { Ingredient, IngredientKind } from "./types"

export function IngredientTile({ piece }: { piece: Ingredient }) {
  const colorClasses: Dict<string, IngredientKind> = {
    green: clsx`bg-green-600 text-white`,
    orange: clsx`bg-yellow-600 text-white`,
    white: clsx`bg-white text-gray-700`,
  }

  if (piece.kind === "empty") return null

  if (piece.kind === "water") {
    return (
      <div
        title="Your droplet"
        className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg bg-blue-600 text-white/75"
        )}
      >
        <DropletIcon size={8} inline />
      </div>
    )
  }

  return (
    <div
      title={`${piece.kind} ${piece.value}`}
      className={clsx(
        "leading-10 text-center w-10 h-10 rounded-full font-bold text-lg",
        colorClasses[piece.kind]
      )}
    >
      {piece.value}
    </div>
  )
}
