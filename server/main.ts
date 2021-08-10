import * as http from "node:http"
import { createSocketServer } from "./socket-server"

const port = Number(process.env.PORT) || 3000

;(async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      const server = http.createServer()
      createSocketServer(server)
      await new Promise<void>((resolve) => server.listen(port, resolve))
    } else {
      const vite = await import("vite")
      const server = await vite.createServer()
      createSocketServer(server.httpServer as http.Server)
      await server.listen(port)
    }
    console.log(`Server running at http://localhost:${port}`)
  } catch (error) {
    console.error(`Error starting server`)
    console.error(error)
  }
})()
