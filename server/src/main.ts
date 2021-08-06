import express from "express"
import WebSocket from "ws"
import { Game } from "./game"

const port = Number(process.env.PORT) || 8080

const expressApp = express()

const server = expressApp.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

const socketServer = new WebSocket.Server({ server })

const game = new Game()

socketServer.on("connection", (socket) => {
  game.addClient(socket)

  socket.on("message", (message) => {
    game.handleSocketMessage(JSON.parse(message.toString()))
  })

  socket.on("close", () => {
    game.removeClient(socket)
  })
})

socketServer.on("error", (error) => {
  console.error(error)
})
