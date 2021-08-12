import type { Ingredient } from "../ingredient/types"

export type GameState = {
  roundNumber: number
  victoryPoints: number
  dropletPosition: number
  rubies: number
  bag: Ingredient[]
  currentScreen: "brewing" | "brewingResults" | "shop"
  brewingScreen: {
    bag: Ingredient[]
    cauldron: Ingredient[]
    action:
      | { type: "addIngredient" }
      | { type: "blueSkullChooseIngredient"; choices: Ingredient[] }
  }
}

export const cherryBombLimit = 7

const initialBag: Ingredient[] = [
  { kind: "orange", value: 1 },
  { kind: "green", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 1 },
  { kind: "white", value: 2 },
  { kind: "white", value: 2 },
  { kind: "white", value: 3 },
  { kind: "blue", value: 1 },
  { kind: "blue", value: 2 },
  { kind: "blue", value: 4 },
]

export const initialGameState: GameState = {
  roundNumber: 1,
  victoryPoints: 0,
  dropletPosition: 0,
  rubies: 0,
  bag: initialBag,
  currentScreen: "brewing",
  brewingScreen: {
    bag: initialBag,
    cauldron: [{ kind: "water", value: 0 }],
    action: { type: "addIngredient" },
  },
}
