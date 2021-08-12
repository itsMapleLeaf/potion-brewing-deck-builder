import clsx from "clsx"

export function DropletIcon({
  size,
  inline,
}: {
  size: 5 | 6 | 8
  inline?: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx(
        size === 5 && `w-5 h-5`,
        size === 6 && `w-6 h-6`,
        size === 8 && `w-8 h-8`,
        inline && `inline align-text-bottom`
      )}
    >
      <path
        fill="currentColor"
        d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"
      />
    </svg>
  )
}
