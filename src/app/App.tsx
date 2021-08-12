import clsx from "clsx"
import produce from "immer"
import { useState } from "react"
import { cauldronSpaces } from "../cauldron/cauldron-space"
import { CauldronSpaceTile } from "../cauldron/CauldronSpaceTile"
import { randomRange } from "../common/helpers"
import { range } from "../common/range"
import { IngredientTile } from "../ingredient/IngredientTile"
import type { Ingredient } from "../ingredient/types"
import { RubyIcon } from "../ui/RubyIcon"
import { SolidButton } from "../ui/SolidButton"

type GameState = {
  roundNumber: number
  victoryPoints: number
  dropletPosition: number
  rubies: number
  bag: Ingredient[]
  currentScreen: "brewing" | "brewingResults" | "shop"
  brewingScreen: {
    bag: Ingredient[]
    cauldron: Ingredient[]
  }
}

const cherryBombLimit = 7

const initialBag: Ingredient[] = [
  { kind: "orange", value: 1 },
  { kind: "green", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 2 },
  { kind: "white", value: 2 },
  { kind: "white", value: 3 },
]

const initialState: GameState = {
  roundNumber: 1,
  victoryPoints: 0,
  dropletPosition: 0,
  rubies: 0,
  bag: initialBag,
  currentScreen: "brewing",
  brewingScreen: {
    bag: initialBag,
    cauldron: [],
  },
}

const appSectionCardClass = "p-4 bg-gray-900 rounded-lg"

export function App() {
  const [state, setState] = useState(initialState)

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

function StatusHeader({ state }: { state: GameState }) {
  return (
    <section
      className={clsx(
        appSectionCardClass,
        `flex flex-row gap-4 font-bold leading-tight`
      )}
    >
      <p title="Round" className="text-green-400">
        <PotionIcon /> {state.roundNumber}
      </p>
      <p title="Victory Points" className="text-yellow-400">
        <StarIcon /> {state.victoryPoints}
      </p>
      <p title="Droplet Position" className="text-blue-400">
        <DropletIcon /> {state.dropletPosition}
      </p>
      <p title="Rubies" className="text-red-400">
        <RubyIcon /> {state.rubies}
      </p>
      <p title="Bag Size" className="text-white">
        <BagIcon /> {state.bag.length}
      </p>
    </section>
  )
}

function BrewingScreen({
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

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 align-text-bottom"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="inline-block w-5 h-5 align-text-bottom">
      <path
        fill="currentColor"
        d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"
      />
    </svg>
  )
}

function PotionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 align-text-bottom"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 h-5 align-text-bottom"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.44393 5.44878L3.55158 3.55783C2.51499 2.52201 3.2486 0.750001 4.71402 0.750001L19.286 0.75C20.7514 0.75 21.485 2.52201 20.4484 3.55783L18.5561 5.44878C20.666 7.28221 22 9.98532 22 13C22 18.5229 17.5228 23 12 23C6.47715 23 2 18.5229 2 13C2 9.98532 3.33401 7.28221 5.44393 5.44878Z"
        fill="currentColor"
      />
    </svg>
  )
}
