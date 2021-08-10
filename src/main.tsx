import { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./App"
import { RouteProvider } from "./router"
import { SocketProvider } from "./socket"

render(
  <StrictMode>
    <SocketProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </SocketProvider>
  </StrictMode>,
  document.getElementById("root")
)
