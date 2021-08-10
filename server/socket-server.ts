import type * as http from "node:http"
import { Server } from "socket.io"
import type { Game } from "./game"
import { GameManager } from "./game"
import type { GameSocketServer } from "./types"

export function createSocketServer(httpServer: http.Server) {
  const server: GameSocketServer = new Server(httpServer, {
    cors: { origin: "*" },
  })

  const gameManager = new GameManager(server)

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
      game?.updateState((state) => {
        state.count += 1
      })
    })
  })
}
