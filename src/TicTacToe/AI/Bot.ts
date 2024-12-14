import type { CurrentBoardIndex, Position } from '@/TicTacToe/types.ts'

export default interface Bot {
  getMove(currentBoard: CurrentBoardIndex): Position
}
