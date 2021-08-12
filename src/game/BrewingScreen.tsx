import clsx from "clsx"
import { cauldronSpaces } from "../cauldron/cauldron-space"
import { CauldronSpaceTile } from "../cauldron/CauldronSpaceTile"
import { IngredientTile } from "../ingredient/IngredientTile"
import type { Ingredient } from "../ingredient/types"
import { SolidButton } from "../ui/SolidButton"
import { appSectionCardClass } from "./Game"
import type { GameState } from "./state"
import { cherryBombLimit } from "./state"

type Props = GameState["brewingScreen"] & {
  onAddIngredient: () => void
  onBlueSkullChoice: (choices: Ingredient[], choiceIndex: number) => void
  onBlueSkullSkip: () => void
}

export function BrewingScreen({ action, ...props }: Props) {
  const cherryValue = props.cauldron
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

        <p>Remaining ingredients: {props.bag.length}</p>

        {action.type === "addIngredient" && (
          <div className="mt-4">
            <SolidButton onClick={props.onAddIngredient}>
              Add ingredient
            </SolidButton>
          </div>
        )}

        {action.type === "blueSkullChooseIngredient" && (
          <div className="flex flex-col items-center gap-4 mt-4">
            <p className="leading-tight">
              You drew a blue skull! Choose an ingredient to add:
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {action.choices.map((choice, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      props.onBlueSkullChoice(action.choices, index)
                    }}
                  >
                    <IngredientTile piece={choice} />
                  </button>
                </li>
              ))}
            </ul>
            <SolidButton onClick={props.onBlueSkullSkip}>Skip</SolidButton>
          </div>
        )}

        <section className="flex flex-wrap justify-center gap-3 mt-6">
          {cauldronSpaces.map((space, index) => {
            const piece = props.cauldron[index]
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
