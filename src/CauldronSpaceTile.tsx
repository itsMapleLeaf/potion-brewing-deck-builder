import clsx from "clsx"
import type { CauldronSpaceInfo } from "./cauldron-spaces"

export function CauldronSpaceTile({
  space,
  children,
}: {
  space: CauldronSpaceInfo
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
