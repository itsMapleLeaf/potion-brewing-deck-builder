import clsx from "clsx"
import { cauldronSpaces } from "../cauldron/cauldron-space"
import { CauldronSpaceTile } from "../cauldron/CauldronSpaceTile"
import { IngredientTile } from "../ingredient/IngredientTile"
import { SolidButton } from "../ui/SolidButton"
import { appSectionCardClass } from "./Game"
import type { GameState } from "./state"
import { cherryBombLimit } from "./state"

export function BrewingScreen({
  bag,
  cauldron,
  onAddIngredient,
}: GameState["brewingScreen"] & { onAddIngredient: () => void }) {
  const cherryValue = cauldron
    .filter((piece) => piece.kind === "white")
    .reduce((count, piece) => count + piece.value, 0)

  function getCherryBombLimitClass() {
    if (cherryValue <= cherryBombLimit - 3) return clsx`text-blue-400`
    if (cherryValue <= cherryBombLimit - 1) return clsx`text-yellow-400`
    return clsx`text-red-400`
  }

  return (
    <section className={appSectionCardClass}>
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-2 text-2xl font-light">Cauldron</h1>

        <p className={getCherryBombLimitClass()}>
          Cherry bomb limit: {cherryValue}/{cherryBombLimit}
        </p>

        <p>Remaining ingredients: {bag.length}</p>

        <section className="flex gap-2 mt-4">
          <SolidButton onClick={onAddIngredient}>Add ingredient</SolidButton>
        </section>

        <section className="flex flex-wrap justify-center gap-3 mt-6">
          {cauldronSpaces.map((space, index) => {
            const piece = cauldron[index]
            return (
              <CauldronSpaceTile key={index} space={space}>
                {piece && <IngredientTile piece={piece} />}
              </CauldronSpaceTile>
            )
          })}
        </section>
      </div>
    </section>
  )
}
