export type SocketState = {
  count: number
}

export type MessageToServer = { type: "increment" }

export type MessageToClient = { type: "newState"; state: SocketState }
