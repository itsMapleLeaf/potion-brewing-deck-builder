export type SocketRoomState = {
  count: number
}

export type MessageToServerMap = {
  "create-room": () => void
  "join-room": (roomId: string) => void
  "increment": () => void
}

export type MessageToClientMap = {
  "joined-room": (roomId: string, state: SocketRoomState) => void
  "joined-room:room-not-found": () => void
  "new-state": (state: SocketRoomState) => void
}
