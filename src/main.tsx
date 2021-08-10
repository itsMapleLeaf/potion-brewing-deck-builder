import { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./App"
import { RouteProvider } from "./router"

render(
  <StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </StrictMode>,
  document.getElementById("root")
)
