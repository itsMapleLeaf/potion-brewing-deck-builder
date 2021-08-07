import * as React from "react"
import { MessageToClient, MessageToServer } from "../../shared/socket"
import { useEffectRef } from "./useEffectRef"

type UseSocketConfig = {
  url: string
  onOpen: () => void
  onClose: () => void
  onMessage: (data: MessageToClient) => void
}

type Status = "connecting" | "online" | "willRetry"

export function useSocket(config: UseSocketConfig) {
  const [status, setStatus] = React.useState<Status>("connecting")
  const socketRef = React.useRef<WebSocket>()
  const configRef = useEffectRef(config)

  React.useEffect(() => {
    const createSocket = () => {
      const socket = (socketRef.current = new WebSocket(config.url))

      socket.addEventListener("open", () => {
        setStatus("online")
        configRef.current.onOpen()
      })

      socket.addEventListener("error", () => {
        setStatus("willRetry")
        configRef.current.onClose()
      })

      socket.addEventListener("close", () => {
        setStatus("willRetry")
        configRef.current.onClose()
      })

      socket.addEventListener("message", (event: MessageEvent<string>) => {
        const data: MessageToClient = JSON.parse(event.data)
        configRef.current.onMessage(data)
      })
    }

    if (status === "connecting") {
      socketRef.current?.close()
      createSocket()
    }
  }, [status, config.url])

  React.useEffect(() => {
    if (status === "willRetry") {
      const timeout = window.setTimeout(() => {
        setStatus("connecting")
      }, 2000)
      return () => window.clearTimeout(timeout)
    }
  }, [status])

  React.useEffect(() => {
    return () => {
      socketRef.current?.close()
    }
  }, [])

  const send = (data: MessageToServer) => {
    socketRef.current?.send(JSON.stringify(data))
  }

  return { send }
}
