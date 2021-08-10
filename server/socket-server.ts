import type * as http from "node:http"
import { Server } from "socket.io"
import type { Game } from "./game"
import type { GameManager } from "./game"
import type { GameSocketServer } from "./types"

export function attachSocketServer(
  httpServer: http.Server,
  gameManager: GameManager
) {
  const server: GameSocketServer = new Server(httpServer, {
    cors: { origin: "*" },
  })

  server.on("connection", (client) => {
    let game: Game | undefined

    client.on("create-room", () => {
      game = gameManager.create()
      game.addClient(client)
    })

    client.on("join-room", (roomId) => {
      game = gameManager.get(roomId)
      if (game) {
        game.addClient(client)
      } else {
        client.emit("joined-room:room-not-found")
      }
    })

    client.on("increment", () => {
      game?.updateState(server, (state) => {
        state.count += 1
      })
    })
  })
}
