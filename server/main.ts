import express from "express"
import * as http from "node:http"
import { join } from "node:path"
import { createExpressApp } from "./express-app"
import { attachSocketServer } from "./socket-server"

const port = Number(process.env.PORT) || 3000

async function createHttpServer() {
  const app = createExpressApp()

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(join(__dirname, "../dist")))

    app.get("*", (req, res) => {
      res.sendFile(join(__dirname, "../dist/index.html"))
    })
  } else {
    const vite = await import("vite")

    const viteServer = await vite.createServer({
      server: { middlewareMode: "html" },
    })

    app.use(viteServer.middlewares)
  }

  return http.createServer(app)
}

createHttpServer().then((server) => {
  attachSocketServer(server)
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
})
