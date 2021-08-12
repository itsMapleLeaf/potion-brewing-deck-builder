import { StrictMode } from "react"
import { render } from "react-dom"
import { Game } from "./game/Game"
import "./style.css"

render(
  <StrictMode>
    <Game />
  </StrictMode>,
  document.getElementById("root")
)
