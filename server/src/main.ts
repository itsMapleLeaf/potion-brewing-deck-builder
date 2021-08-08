import type { Socket } from "socket.io"
import { Server } from "socket.io"
import type {
  MessageToClientMap,
  MessageToServerMap,
} from "../../shared/socket"
import type { Game } from "./game"
import { addClientToGame, createGame, getGame, updateGameState } from "./game"

export type GameSocketServer = Server<MessageToServerMap, MessageToClientMap>
export type GameSocket = Socket<MessageToServerMap, MessageToClientMap>

const server: GameSocketServer = new Server()

server.on("connection", (client) => {
  let game: Game | undefined

  client.on("create-room", () => {
    game = createGame()
    addClientToGame(game.roomId, client)
  })

  client.on("join-room", (roomId) => {
    game = getGame(roomId)

    if (!game) {
      client.emit("joined-room:room-not-found")
      return
    }

    addClientToGame(roomId, client)
  })

  client.on("increment", () => {
    if (!game) return

    updateGameState(game.roomId, server, (state) => {
      state.count += 1
    })
  })
})

server.listen(Number(process.env.PORT) || 8080, {
  cors: {
    origin: "*",
  },
})
