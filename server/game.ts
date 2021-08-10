import { randomUUID } from "node:crypto"
import type { SocketRoomState } from "../shared/socket"
import type { GameSocket, GameSocketServer } from "./types"

export class GameManager {
  private games = new Map<string, Game>()
  private server: GameSocketServer

  constructor(server: GameSocketServer) {
    this.server = server
  }

  create(): Game {
    const game = new Game(this.server)
    this.games.set(game.roomId, game)
    return game
  }

  get(roomId: string): Game | undefined {
    return this.games.get(roomId)
  }
}

export class Game {
  readonly roomId = randomUUID()
  private state: SocketRoomState = { count: 0 }
  private server: GameSocketServer

  constructor(server: GameSocketServer) {
    this.server = server
  }

  addClient(client: GameSocket): void {
    client.join(this.roomId)
    client.emit("joined-room", this.roomId, this.state)
  }

  updateState(mutate: (state: SocketRoomState) => void): void {
    mutate(this.state)
    this.server.to(this.roomId).emit("new-state", this.state)
  }
}