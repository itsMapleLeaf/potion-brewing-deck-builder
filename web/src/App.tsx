import * as React from "react"
import { useSocket } from "./useSocket"

export function App() {
  const socket = useSocket({
    url: "ws://localhost:8080/",
  })

  const increment = () => {
    socket.send({ type: "increment" })
  }

  if (socket.status !== "online") {
    return <p>Connecting...</p>
  }

  return <button onClick={increment}>{socket.state.count}</button>
}
