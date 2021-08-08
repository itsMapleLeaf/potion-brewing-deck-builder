import { randomUUID } from "node:crypto"
import { Server } from "socket.io"
import type {
  MessageToClientMap,
  MessageToServerMap,
  SocketRoomState,
} from "../../shared/socket"

type Game = {
  roomId: string
  state: SocketRoomState
}
const games = new Map<string, Game>()

const server = new Server<MessageToServerMap, MessageToClientMap>()

server.on("connection", (client) => {
  let game: Game | undefined

  client.on("create-room", () => {
    const roomId = randomUUID()

    game = {
      roomId,
      state: { count: 0 },
    }

    games.set(roomId, game)
    client.join(roomId)
    client.emit("joined-room", roomId, game.state)
  })

  client.on("join-room", (roomId) => {
    game = games.get(roomId)

    if (!game) {
      client.emit("joined-room:room-not-found")
      return
    }

    client.join(roomId)
    client.emit("joined-room", roomId, game.state)
  })

  client.on("increment", () => {
    if (!game) return

    game.state.count += 1

    server.to(game.roomId).emit("new-state", game.state)
  })
})

server.listen(Number(process.env.PORT) || 8080, {
  cors: {
    origin: "*",
  },
})
