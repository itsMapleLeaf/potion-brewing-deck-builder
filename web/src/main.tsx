import { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./App"
import { SocketProvider } from "./socket"

render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>,
  document.getElementById("root")
)
