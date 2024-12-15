import type Bot from './Bot'
import type {
  Board,
  CurrentBoardIndex,
  MiniMaxMove,
  Position,
  Sign,
  SmallBoard,
} from '@/TicTacToe/types.ts'
import { boardSize, checkWin } from '@/TicTacToe/GameController.ts'
import { getRandomElement, getEmptyCellIndexes } from '@/TicTacToe/utils.ts'

export default class MediumBot implements Bot {
  public constructor(
    private readonly board: Board,
    private readonly winnerBoard: SmallBoard,
  ) {}

  public getMove(currentBoard: CurrentBoardIndex): Position {
    if (currentBoard === null) {
      const freeIndexes: number[] = getEmptyCellIndexes(this.winnerBoard)
      currentBoard = getRandomElement<number>(freeIndexes)
    }

    const index: number | undefined = this.miniMax(
      this.board[currentBoard],
      'O',
      getEmptyCellIndexes(this.board[currentBoard]).length,
    ).index

    if (index === undefined) {
      throw new Error('Index must be present to make a minimax move')
    }

    return {
      smallBoard: currentBoard,
      row: Math.floor(index / 3),
      cell: index % 3,
    }
  }

  /**
   * Inspired by:
   * @see https://github.com/andersonpereiradossantos/tic-tac-toe-ai-minimax
   * @see https://gist.github.com/Pragalbha-Patil/8f09d11cf09ad249767da0df8649f459
   * @see https://www.youtube.com/watch?v=5y2a0Zhgq0U
   * */
  private miniMax(board: SmallBoard, player: Sign, depth: number): MiniMaxMove {
    const empty = getEmptyCellIndexes(board)

    if (empty.length === boardSize) {
      return { score: 0, index: 4 }
    }
    if (checkWin(this.winnerBoard, 'X')) {
      return { score: -1 }
    }
    if (checkWin(this.winnerBoard, 'O')) {
      return { score: 1 }
    }
    if (empty.length === 0 || depth === 0) {
      return { score: 0 }
    }

    depth--

    const moves: Array<{ index: number; score: number }> = []

    for (let i = 0; i < empty.length; i++) {
      const newBoard = JSON.parse(JSON.stringify(board))
      newBoard[Math.floor(empty[i] / 3)][empty[i] % 3] = player

      const result = this.miniMax(newBoard, player === 'O' ? 'X' : 'O', depth)
      moves.push({ index: empty[i], score: result.score })
    }

    let bestMove: number | null = null

    if (player === 'X') {
      let bestScore: number = -Infinity
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } else {
      let bestScore: number = Infinity
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }

    if (bestMove === null) {
      throw new Error('Best move not found')
    }

    return moves[bestMove]
  }
}
