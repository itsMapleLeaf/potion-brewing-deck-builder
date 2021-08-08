import * as React from "react"
import type { SocketRoomState } from "../../shared/socket"
import { useSocketActions, useSocketListener } from "./socket"

type AppState =
  | { status: "connecting" }
  | { status: "home" }
  | { status: "error" }
  | { status: "joiningRoom" }
  | { status: "room"; roomId: string; state: SocketRoomState }

export function App() {
  const [state, setState] = React.useState<AppState>({ status: "connecting" })
  const { send } = useSocketActions()

  useSocketListener({
    "connect"() {
      setState({ status: "home" })
    },

    "connect_error"() {
      setState({ status: "error" })
    },

    "disconnect"() {
      setState({ status: "connecting" })
    },

    "joined-room"(roomId, state) {
      setState({ status: "room", roomId, state })
    },

    "joined-room:room-not-found"() {
      setState({ status: "home" })
    },

    "new-state"(newState) {
      setState((state) => {
        if (state.status !== "room") return state
        return { ...state, state: newState }
      })
    },
  })

  if (state.status === "connecting") {
    return <p>Connecting...</p>
  }

  if (state.status === "error") {
    return <p>Error connecting to server</p>
  }

  if (state.status === "home") {
    return (
      <>
        <button
          onClick={() => {
            send("create-room")
            setState({ status: "joiningRoom" })
          }}
        >
          Create room
        </button>
        <button
          onClick={() => {
            const roomId = prompt("Room ID?")
            if (roomId) {
              send("join-room", roomId)
              setState({ status: "joiningRoom" })
            }
          }}
        >
          Join room
        </button>
      </>
    )
  }

  if (state.status === "joiningRoom") {
    return <p>Joining room...</p>
  }

  if (state.status === "room") {
    return (
      <>
        <p>room ID: {state.roomId}</p>
        <button onClick={() => send("increment")}>{state.state.count}</button>
      </>
    )
  }

  return null
}
