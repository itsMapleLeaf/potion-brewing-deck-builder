import express from "express"

export function createExpressApp() {
  const app = express()

  app.get("/create-game", (req, res) => {
    res.redirect(`/game/dfkljsdfkl`)
  })

  return app
}
