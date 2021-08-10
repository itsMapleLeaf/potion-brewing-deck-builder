import { lazy, Suspense } from "react"
import { HomePage } from "./HomePage"
import { useRoute } from "./router"

const GamePage = lazy(() =>
  import("./GamePage").then((m) => ({ default: m.GamePage }))
)

export function App() {
  const route = useRoute()
  return (
    <Suspense fallback="Loading...">
      {route.name === "home" && <HomePage />}
      {route.name === "game" && <GamePage {...route.params} />}
    </Suspense>
  )
}
