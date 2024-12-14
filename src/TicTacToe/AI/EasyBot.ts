import type Bot from './Bot'
import type { Board, CurrentBoardIndex, Position, SmallBoard } from '@/TicTacToe/types.ts'
import { getEmptyCellIndexes, getRandomElement } from '@/TicTacToe/utils.ts'

export default class EasyBot implements Bot {
  public constructor(
    private readonly board: Board,
    private readonly winnerBoard: SmallBoard,
  ) {}

  public getMove(currentBoard: CurrentBoardIndex): Position {
    if (currentBoard === null) {
      const freeIndexes: number[] = getEmptyCellIndexes(this.winnerBoard)
      currentBoard = getRandomElement<number>(freeIndexes)
    }

    const freeSmallBoardIndexes = getEmptyCellIndexes(this.board[currentBoard])
    const randomIndex = getRandomElement<number>(freeSmallBoardIndexes)

    return {
      smallBoard: currentBoard,
      row: Math.floor(randomIndex / 3),
      cell: randomIndex % 3,
    }
  }
}
