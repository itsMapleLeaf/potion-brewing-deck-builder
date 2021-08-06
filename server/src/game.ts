import WebSocket from "ws"
import {
  MessageToClient,
  MessageToServer,
  SocketState,
} from "../../shared/socket"

export class Game {
  #state: SocketState = {
    count: 0,
  }

  #clients = new Set<WebSocket>()

  addClient(client: WebSocket) {
    this.#clients.add(client)
    this.#sendStateUpdate(client)
  }

  removeClient(client: WebSocket) {
    this.#clients.delete(client)
  }

  handleSocketMessage(message: MessageToServer) {
    if (message.type === "increment") {
      this.#updateState((state) => {
        state.count++
      })
    }
  }

  #updateState(fn: (state: SocketState) => void) {
    fn(this.#state)
    for (const client of this.#clients) {
      this.#sendStateUpdate(client)
    }
  }

  #sendStateUpdate(client: WebSocket) {
    this.#sendMessage(client, {
      type: "newState",
      state: this.#state,
    })
  }

  #sendMessage(client: WebSocket, message: MessageToClient) {
    client.send(JSON.stringify(message))
  }
}
