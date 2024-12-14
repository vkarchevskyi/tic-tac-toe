import type Bot from './Bot'
import type { Board, CurrentBoardIndex, Position, Sign, SmallBoard } from '@/TicTacToe/types.ts'
import { boardRowQuantity } from '@/TicTacToe/GameController.ts'
import { getRandomElement } from '@/TicTacToe/utils.ts'

export default class EasyBot implements Bot {
  public constructor(
    private readonly board: Board,
    private readonly winnerBoard: SmallBoard,
  ) {}

  public getMove(currentBoard: CurrentBoardIndex): Position {
    if (currentBoard === null) {
      const freeIndexes: number[] = this.getFreeBoardIndexes(this.winnerBoard)
      currentBoard = getRandomElement<number>(freeIndexes)
    }

    const freeSmallBoardIndexes = this.getFreeBoardIndexes(this.board[currentBoard])
    const randomIndex = getRandomElement<number>(freeSmallBoardIndexes)

    return {
      smallBoard: currentBoard,
      row: Math.floor(randomIndex / 3),
      cell: randomIndex % 3,
    }
  }

  private getFreeBoardIndexes(board: SmallBoard): number[] {
    const freeIndexes: number[] = []

    board.forEach((row: Sign[], index: number): void => {
      freeIndexes.push(
        ...row
          .map(
            (sign: Sign, rowIndex: number): CurrentBoardIndex =>
              sign === '' ? rowIndex + boardRowQuantity * index : null,
          )
          .filter((index: CurrentBoardIndex) => index !== null),
      )
    })

    return freeIndexes
  }
}
