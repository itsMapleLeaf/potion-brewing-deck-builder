import { createContext, useContext, useEffect, useMemo, useState } from "react"
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

type SocketEventListenerMap = MessageToClientMap & SocketReservedEvents

const SocketContext = createContext<ClientSocket>()

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<ClientSocket>()

  useEffect(() => {
    const socket = createSocket("ws://localhost:8080/")
    setSocket(socket)
    return () => {
      socket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export function useSocketListener(listeners: Partial<SocketEventListenerMap>) {
  const socket = useContext(SocketContext)

  useEffect(() => {
    for (const [event, listener] of Object.entries(listeners)) {
      socket?.on(event as any, listener)
    }

    return () => {
      for (const [event, listener] of Object.entries(listeners)) {
        socket?.off(event as any, listener)
      }
    }
  })
}

export function useSocketActions() {
  const socket = useContext(SocketContext)

  return useMemo(() => {
    return {
      send<Ev extends EventNames<MessageToServerMap>>(
        ...args: [Ev, ...EventParams<MessageToServerMap, Ev>]
      ) {
        socket?.emit(...args)
      },
    }
  }, [socket])
}
