import { randomUUID } from "node:crypto"
import type { SocketRoomState } from "../shared/socket"
import type { GameSocket, GameSocketServer } from "./types"

export class GameManager {
  private games = new Map<string, Game>()

  create(): Game {
    const game = new Game()
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

  addClient(client: GameSocket): void {
    client.join(this.roomId)
    client.emit("joined-room", this.roomId, this.state)
    client.emit("new-state", this.state)
  }

  updateState(
    server: GameSocketServer,
    mutate: (state: SocketRoomState) => void
  ): void {
    mutate(this.state)
    server.to(this.roomId).emit("new-state", this.state)
  }
}
