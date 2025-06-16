import type { Board, CurrentBoardIndex, Sign, SmallBoard } from './types'
import { getDefaultBoard, getEmptySmallBoard } from './BoardFactory'

export interface GameStateData {
  board: Board
  winBoard: SmallBoard
  currentPlayer: Sign
  currentBoard: CurrentBoardIndex
  winner: string | null
  isTie: boolean
  gameOver: boolean
}

export class GameState {
  private _board: Board
  private _winBoard: SmallBoard
  private _currentPlayer: Sign
  private _currentBoard: CurrentBoardIndex
  private _winner: string | null
  private _isTie: boolean
  private _gameOver: boolean

  constructor(initialData?: Partial<GameStateData>) {
    this._board = initialData?.board ?? getDefaultBoard()
    this._winBoard = initialData?.winBoard ?? getEmptySmallBoard()
    this._currentPlayer = initialData?.currentPlayer ?? 'X'
    this._currentBoard = initialData?.currentBoard ?? null
    this._winner = initialData?.winner ?? null
    this._isTie = initialData?.isTie ?? false
    this._gameOver = initialData?.gameOver ?? false
  }

  // Getters
  get board(): Board {
    return this._board
  }
  get winBoard(): SmallBoard {
    return this._winBoard
  }
  get currentPlayer(): Sign {
    return this._currentPlayer
  }
  get currentBoard(): CurrentBoardIndex {
    return this._currentBoard
  }
  get winner(): string | null {
    return this._winner
  }
  get isTie(): boolean {
    return this._isTie
  }
  get gameOver(): boolean {
    return this._gameOver
  }

  // State mutations
  setBoard(board: Board): void {
    this._board = board
  }

  setWinBoard(winBoard: SmallBoard): void {
    this._winBoard = winBoard
  }

  setCurrentPlayer(player: Sign): void {
    this._currentPlayer = player
  }

  setCurrentBoard(boardIndex: CurrentBoardIndex): void {
    this._currentBoard = boardIndex
  }

  setWinner(winner: string | null): void {
    this._winner = winner
  }

  setTie(isTie: boolean): void {
    this._isTie = isTie
  }

  setGameOver(gameOver: boolean): void {
    this._gameOver = gameOver
  }

  switchPlayer(): void {
    this._currentPlayer = this._currentPlayer === 'X' ? 'O' : 'X'
  }

  reset(): void {
    this._board = getDefaultBoard()
    this._winBoard = getEmptySmallBoard()
    this._currentPlayer = 'X'
    this._currentBoard = null
    this._winner = null
    this._isTie = false
    this._gameOver = false
  }

  getData(): GameStateData {
    return {
      board: this._board,
      winBoard: this._winBoard,
      currentPlayer: this._currentPlayer,
      currentBoard: this._currentBoard,
      winner: this._winner,
      isTie: this._isTie,
      gameOver: this._gameOver,
    }
  }

  setData(data: Partial<GameStateData>): void {
    if (data.board !== undefined) this._board = data.board
    if (data.winBoard !== undefined) this._winBoard = data.winBoard
    if (data.currentPlayer !== undefined) this._currentPlayer = data.currentPlayer
    if (data.currentBoard !== undefined) this._currentBoard = data.currentBoard
    if (data.winner !== undefined) this._winner = data.winner
    if (data.isTie !== undefined) this._isTie = data.isTie
    if (data.gameOver !== undefined) this._gameOver = data.gameOver
  }
}
