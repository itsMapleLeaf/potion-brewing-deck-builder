import { randomUUID } from "node:crypto"
import WebSocket from "ws"
import { isTruthy } from "../../shared/helpers"
import {
  MessageToClient,
  MessageToServer,
  SocketRoomState,
} from "../../shared/socket"

type Room = {
  players: Set<string>
  state: SocketRoomState
}

type Player = {
  id: string
  socket: WebSocket
}

function sendMessage(socket: WebSocket, message: MessageToClient) {
  socket.send(JSON.stringify(message))
}

const rooms: Record<string, Room> = {}
const players: Record<string, Player> = {}

const port = Number(process.env.PORT) || 8080
const server = new WebSocket.Server({ port }, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

server.on("connection", (socket) => {
  const self: Player = {
    id: randomUUID(),
    socket,
  }

  players[self.id] = self

  let room: Room | undefined

  socket.on("message", (data) => {
    const message: MessageToServer = JSON.parse(data.toString())

    switch (message.type) {
      case "createRoom": {
        const roomId = randomUUID()

        room = rooms[roomId] = {
          state: { count: 0 },
          players: new Set([self.id]),
        }

        sendMessage(socket, { type: "joinedRoom", roomId })
        sendMessage(socket, { type: "newState", state: room.state })
        break
      }

      case "joinRoom": {
        room = rooms[message.roomId]

        if (!room) {
          sendMessage(socket, { type: "joinedRoom:roomDoesNotExist" })
          break
        }

        room.players.add(self.id)
        sendMessage(socket, { type: "joinedRoom", roomId: message.roomId })
        sendMessage(socket, { type: "newState", state: room.state })
        break
      }

      case "increment": {
        if (!room) break

        room.state.count++

        const playersInRoom = [...room.players]
          .map((id) => players[id])
          .filter(isTruthy)

        for (const player of playersInRoom) {
          sendMessage(player.socket, { type: "newState", state: room.state })
        }

        break
      }
    }
  })

  socket.on("close", () => {
    delete players[self.id]
    room?.players.delete(self.id)
  })
})

server.on("error", (error) => {
  console.error("socket error", error)
})
