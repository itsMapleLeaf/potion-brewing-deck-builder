import produce from "immer"
import { pickRandomItems } from "../common/helpers"
import { range } from "../common/range"
import type { Ingredient } from "../ingredient/ingredient"

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

export function drawIngredients(
  state: GameState,
  count: number,
): {
  ingredients: Ingredient[]
  state: GameState
} {
  const { chosenItems, remainingItems } = pickRandomItems(
    state.brewingScreen.bag,
    count,
  )

  state = produce(state, (draft) => {
    draft.brewingScreen.bag = remainingItems
  })

  return { ingredients: chosenItems, state }
}

export function addIngredientToCauldron(state: GameState, piece: Ingredient) {
  state = produce(state, (draft) => {
    for (const _ of range(0, piece.value - 1)) {
      draft.brewingScreen.cauldron.push({ kind: "empty", value: 0 })
    }
    draft.brewingScreen.cauldron.push(piece)
  })

  return resolveIngredientEffect(state, piece)
}

export function addIngredientToBrewingBag(state: GameState, piece: Ingredient) {
  return produce(state, (draft) => {
    draft.brewingScreen.bag.push(piece)
  })
}

function resolveIngredientEffect(state: GameState, ingredient: Ingredient) {
  return produce(state, (draft) => {
    switch (ingredient.kind) {
      case "blue": {
        const { chosenItems, remainingItems } = pickRandomItems(
          draft.brewingScreen.bag,
          ingredient.value,
        )
        draft.brewingScreen.bag = remainingItems
        draft.brewingScreen.action = {
          type: "blueSkullChooseIngredient",
          choices: chosenItems,
        }
        break
      }

      default: {
        draft.brewingScreen.action = { type: "addIngredient" }
      }
    }
  })
}
