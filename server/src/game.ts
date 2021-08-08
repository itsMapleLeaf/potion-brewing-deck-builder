import { randomUUID } from "node:crypto"
import type { SocketRoomState } from "../../shared/socket"
import type { GameSocket, GameSocketServer } from "./main"

const games = new Map<string, Game>()

export type Game = {
  roomId: string
  state: SocketRoomState
}

export function createGame(): Game {
  const game: Game = {
    roomId: randomUUID(),
    state: {
      count: 0,
    },
  }
  games.set(game.roomId, game)
  return game
}

export function getGame(roomId: string): Game | undefined {
  return games.get(roomId)
}

export function addClientToGame(roomId: string, client: GameSocket): void {
  const game = getGame(roomId)
  if (!game) return

  client.join(roomId)
  client.emit("joined-room", roomId, game.state)
}

export function updateGameState(
  roomId: string,
  server: GameSocketServer,
  update: (state: SocketRoomState) => void
): void {
  const game = getGame(roomId)
  if (!game) return

  update(game.state)
  server.to(game.roomId).emit("new-state", game.state)
}
