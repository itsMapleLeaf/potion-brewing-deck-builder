import { useCallback, useEffect, useState } from "react"
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

type ClientSocket = Socket<MessageToClientMap, MessageToServerMap>

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
  const [socket, setSocket] = useState<ClientSocket>()

  useEffect(() => {
    const socket = createSocket("ws://localhost:8080/")
    setSocket(socket)
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    const handlers = options.events
    if (!socket || !handlers) return

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
      ...args: [Ev, ...EventParams<MessageToServerMap, Ev>]
    ) => {
      socket?.emit(...args)
    },
    [socket]
  )

  return { send }
}
