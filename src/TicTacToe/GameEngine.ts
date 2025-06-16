import type { Position, Sign } from './types'
import { GameState, type GameStateData } from './GameState'
import { checkTie, checkWin, getNextBoardIndex, getWinnerBoard, isValidMove } from './GameRules'

export class GameEngine {
  private gameState: GameState

  constructor(initialState?: Partial<GameStateData>) {
    this.gameState = new GameState(initialState)
  }

  makeMove(position: Position, player: Sign): boolean {
    const validMove = isValidMove(
      position.smallBoard,
      position.row,
      position.cell,
      this.gameState.gameOver,
      this.gameState.board,
      this.gameState.currentBoard,
      this.gameState.currentPlayer,
      player,
    )

    if (!validMove) {
      return false
    }

    // Make the move
    this.gameState.board[position.smallBoard][position.row][position.cell] =
      this.gameState.currentPlayer
    this.gameState.setWinBoard(getWinnerBoard(this.gameState.board))

    // Check game end conditions
    if (checkWin(this.gameState.winBoard, this.gameState.currentPlayer)) {
      this.gameState.setWinner(this.gameState.currentPlayer)
      this.gameState.setGameOver(true)
    } else if (checkTie(this.gameState.winBoard)) {
      this.gameState.setTie(true)
      this.gameState.setGameOver(true)
    } else {
      this.gameState.switchPlayer()
    }

    // Update current board for next move
    if (!this.gameState.gameOver) {
      this.gameState.setCurrentBoard(
        getNextBoardIndex(this.gameState.board, position.row, position.cell),
      )
    }

    return true
  }

  getGameState(): GameStateData {
    return this.gameState.getData()
  }

  setGameState(data: Partial<GameStateData>): void {
    this.gameState.setData(data)
  }

  reset(): void {
    this.gameState.reset()
  }

  isGameOver(): boolean {
    return this.gameState.gameOver
  }

  getCurrentPlayer(): Sign {
    return this.gameState.currentPlayer
  }
}
