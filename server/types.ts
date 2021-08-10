import type { Server, Socket } from "socket.io"
import type { MessageToClientMap, MessageToServerMap } from "../shared/socket"

export type GameSocketServer = Server<MessageToServerMap, MessageToClientMap>

export type GameSocket = Socket<MessageToServerMap, MessageToClientMap>
