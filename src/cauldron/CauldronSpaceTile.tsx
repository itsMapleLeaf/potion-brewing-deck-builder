import { RubyIcon } from "../ui/RubyIcon"
import type { CauldronSpace } from "./cauldron-space"

export function CauldronSpaceTile({
  space,
  children,
}: {
  space: CauldronSpace
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col w-24 h-24 bg-gray-800 rounded shadow bg-gray">
      <p className="flex justify-between mx-1.5 mt-1.5 font-medium leading-none">
        <span
          className="leading-5"
          title={`Gives you ${space.shopPoints} point(s) for shopping`}
        >
          {space.shopPoints}
        </span>

        {space.victoryPoints > 0 && (
          <span
            title={`Gives you ${space.victoryPoints} victory point(s)`}
            className="inline-block w-5 h-5 leading-5 text-gray-800 bg-yellow-200"
          >
            {space.victoryPoints}
          </span>
        )}
      </p>

      <div className="self-center mt-1">{children}</div>

      {space.hasRuby && (
        <div className="absolute text-red-400 right-1.5 bottom-1.5">
          <RubyIcon />
        </div>
      )}
    </div>
  )
}
