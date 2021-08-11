import type { ReactNode } from "react"

export function SolidButton(props: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      {...props}
      className="px-3 py-2 font-medium text-white transition bg-blue-600 rounded shadow hover:bg-blue-700"
    />
  )
}
