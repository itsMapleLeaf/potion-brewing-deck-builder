import * as React from "react"
import { SocketRoomState } from "../../shared/socket"
import { useSocket } from "./useSocket"

type AppState =
  | { status: "connecting" }
  | { status: "home" }
  | { status: "joiningRoom" }
  | { status: "room"; roomId: string; state: SocketRoomState }

export function App() {
  const [state, setState] = React.useState<AppState>({ status: "connecting" })

  const socket = useSocket({
    url: "ws://localhost:8080/",
    onOpen() {
      setState({ status: "home" })
    },
    onClose() {
      setState({ status: "connecting" })
    },
    onMessage(message) {
      if (message.type === "joinedRoom") {
        setState({
          status: "room",
          roomId: message.roomId,
          state: { count: 0 },
        })
      }
      if (message.type === "joinedRoom:roomDoesNotExist") {
        setState({ status: "home" })
      }
      if (message.type === "newState") {
        setState((state) =>
          state.status === "room" ? { ...state, state: message.state } : state
        )
      }
    },
  })

  if (state.status === "connecting") {
    return <p>Connecting...</p>
  }

  if (state.status === "home") {
    return (
      <>
        <button
          onClick={() => {
            socket.send({ type: "createRoom" })
            setState({ status: "joiningRoom" })
          }}
        >
          Create room
        </button>
        <button
          onClick={() => {
            const roomId = prompt("Room ID?")
            if (roomId) {
              socket.send({ type: "joinRoom", roomId })
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
        <button
          onClick={() => {
            socket.send({ type: "increment" })
          }}
        >
          {state.state.count}
        </button>
      </>
    )
  }

  return null
}
