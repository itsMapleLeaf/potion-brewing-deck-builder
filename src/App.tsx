import { routes, useRoute } from "./router"

export function App() {
  const route = useRoute()

  return (
    <>
      {route.name === "home" && <HomePage />}
      {route.name === "game" && <GamePage {...route.params} />}
    </>
  )
}

function HomePage() {
  return (
    <>
      <a {...routes.game({ gameId: "123" }).link}>Create Game</a>
    </>
  )
}

function GamePage({ gameId }: { gameId: string }) {
  return <p>game {gameId}</p>
}
