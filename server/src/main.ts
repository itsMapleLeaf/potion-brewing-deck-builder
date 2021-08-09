import * as http from "node:http"
import { Server } from "socket.io"
import type { Game } from "./game"
import { GameManager } from "./game"
import type { GameSocketServer } from "./types"

const httpServer = new http.Server()

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

const port = Number(process.env.PORT) || 8080
httpServer.listen(port, () => {
  console.log(`Server listening on ws://localhost:${8080}`)
})
