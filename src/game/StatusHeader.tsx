import clsx from "clsx"
import { BagIcon } from "../ui/BagIcon"
import { DropletIcon } from "../ui/DropletIcon"
import { PotionIcon } from "../ui/PotionIcon"
import { RubyIcon } from "../ui/RubyIcon"
import { StarIcon } from "../ui/StarIcon"
import { appSectionCardClass } from "./Game"
import type { GameState } from "./state"

export function StatusHeader({ state }: { state: GameState }) {
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
        <DropletIcon size={5} inline /> {state.dropletPosition}
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
