import { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./app/App"
import "./style.css"

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
)
