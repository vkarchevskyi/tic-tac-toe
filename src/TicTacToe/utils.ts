import type { CurrentBoardIndex, Sign, SmallBoard } from '@/TicTacToe/types.ts'
import { boardRowQuantity } from '@/TicTacToe/GameController.ts'

export const getRandomElement = <T>(array: Array<T>): T => {
  return array[(array.length * Math.random()) | 0]
}

export const getEmptyCellIndexes = (board: SmallBoard): number[] => {
  const emptyCellIndexes: number[] = []

  board.forEach((row: Sign[], index: number): void => {
    emptyCellIndexes.push(
      ...row
        .map(
          (sign: Sign, rowIndex: number): CurrentBoardIndex =>
            sign === '' ? rowIndex + boardRowQuantity * index : null,
        )
        .filter((index: CurrentBoardIndex) => index !== null),
    )
  })

  return emptyCellIndexes
}
