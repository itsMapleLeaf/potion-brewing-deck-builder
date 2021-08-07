export type SocketRoomState = {
  count: number
}

export type MessageToServer =
  | { type: "createRoom" }
  | { type: "joinRoom"; roomId: string }
  | { type: "increment" }

export type MessageToClient =
  | { type: "joinedRoom"; roomId: string }
  | { type: "joinedRoom:roomDoesNotExist" }
  | { type: "newState"; state: SocketRoomState }
