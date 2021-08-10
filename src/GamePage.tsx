import { useEffect, useRef, useState } from "react"
import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import type {
  MessageToClientMap,
  MessageToServerMap,
  SocketRoomState,
} from "../shared/socket"
import { routes } from "./router"

type ClientSocket = Socket<MessageToClientMap, MessageToServerMap>

type SocketStatus = "disconnected" | "connecting" | "connected" | "not-found"

export function GamePage({ gameId }: { gameId: string }) {
  const [status, setStatus] = useState<SocketStatus>("disconnected")
  const [state, setState] = useState<SocketRoomState>({ count: 0 })
  const socketRef = useRef<ClientSocket>()

  useEffect(() => {
    const socket: ClientSocket = (socketRef.current = io())

    socket.on("connect", () => {
      setStatus("connected")
      socket.emit("join-room", gameId)
    })

    socket.on("joined-room:room-not-found", () => {
      setStatus("not-found")
    })

    socket.on("connect_error", () => {
      setStatus("disconnected")
    })

    socket.on("disconnect", () => {
      setStatus("disconnected")
    })

    socket.on("new-state", setState)

    return () => {
      socket.disconnect()
    }
  }, [gameId])

  const handleIncrement = () => {
    socketRef.current?.emit("increment")
  }

  if (status === "not-found") {
    return (
      <main>
        <h1>Room not found</h1>
        <a {...routes.home().link}>Return to home</a>
      </main>
    )
  }

  return (
    <>
      <p>
        {status === "connected"
          ? "Connected"
          : status === "connecting"
          ? "Connecting..."
          : "Not connected"}
      </p>
      <button disabled={status !== "connected"} onClick={handleIncrement}>
        {state.count}
      </button>
    </>
  )
}
