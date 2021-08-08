import { useCallback, useEffect, useRef } from "react"
import type { Socket } from "socket.io-client"
import { io as createSocket } from "socket.io-client"
import type {
  EventNames,
  EventParams,
} from "socket.io-client/build/typed-events"
import type {
  MessageToClientMap,
  MessageToServerMap,
} from "../../shared/socket"

// coped from typedefs because it's not exported lol
type SocketReservedEvents = {
  connect: () => void
  connect_error: (err: Error) => void
  disconnect: (reason: Socket.DisconnectReason) => void
}

type SocketEventMap = Partial<MessageToClientMap & SocketReservedEvents>

type UseSocketOptions = {
  url: string
  events?: SocketEventMap
}

export function useSocketIoClient(options: UseSocketOptions) {
  const socketRef = useRef<Socket<MessageToClientMap, MessageToServerMap>>()

  useEffect(() => {
    const socket = (socketRef.current = createSocket("ws://localhost:8080/"))
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    const handlers = options.events
    if (!socket) return
    if (!handlers) return

    for (const [event, callback] of Object.entries(handlers)) {
      socket.on(event as any, callback)
    }
    return () => {
      for (const [event, callback] of Object.entries(handlers)) {
        socket.off(event as any, callback)
      }
    }
  })

  const send = useCallback(
    <Ev extends EventNames<MessageToServerMap>>(
      ev: Ev,
      ...args: EventParams<MessageToServerMap, Ev>
    ) => {
      socketRef.current?.emit(ev, ...args)
    },
    []
  )

  return { send }
}
