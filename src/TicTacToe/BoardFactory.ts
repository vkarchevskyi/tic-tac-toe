import type { SmallBoard } from './types'

export const boardSize: number = 9
export const boardRowQuantity: number = 3

/**
 * Creates an empty 3x3 board
 */
export const getEmptySmallBoard = (): SmallBoard => {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
}

/**
 * Creates the default 3x3 grid of small boards for Ultimate Tic-Tac-Toe
 */
export const getDefaultBoard = () => {
  const board = []
  for (let i = 0; i < boardSize; i++) {
    board.push(getEmptySmallBoard())
  }
  return board
}
