import { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./App"
import { RouteProvider } from "./router"
import "./style.css"

render(
  <StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </StrictMode>,
  document.getElementById("root")
)
