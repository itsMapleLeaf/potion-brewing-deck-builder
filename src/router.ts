import { createRouter, defineRoute, param } from "type-route"

export const { RouteProvider, useRoute, routes } = createRouter({
  home: defineRoute("/"),
  game: defineRoute({ gameId: param.path.string }, (p) => `/game/${p.gameId}`),
})
