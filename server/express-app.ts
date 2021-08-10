import express from "express"
import type { GameManager } from "./game"

export function createExpressApp(gameManager: GameManager) {
  const app = express()

  app.get("/create-game", (req, res) => {
    const game = gameManager.create()
    res.redirect(`/game/${game.roomId}`)
  })

  return app
}
