import { Server } from "socket.io"
import type { Game } from "./game"
import { GameManager } from "./game"
import type { GameSocketServer } from "./types"

const server: GameSocketServer = new Server()
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

  client.on("disconnect", () => {
    game?.removeClient(client)
  })
})

server.listen(Number(process.env.PORT) || 8080, {
  cors: {
    origin: "*",
  },
})
