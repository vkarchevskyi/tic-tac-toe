import { getEmptySmallBoard } from './BoardFactory'
import type { Board, Sign, SmallBoard } from './types'
import { getEmptyCellIndexes } from './utils'

export const boardRowQuantity: number = 3

/**
 * Checks if a player has won on a 3x3 board
 */
export const checkWin = (board: SmallBoard, player: Sign): boolean => {
  // Check rows and columns
  for (let i = 0; i < boardRowQuantity; i++) {
    if (board[i].every((cell): boolean => cell === player)) return true
    if (board.every((row): boolean => row[i] === player)) return true
  }

  // Check diagonals
  return (
    (board[0][2] === player && board[1][1] === player && board[2][0] === player) ||
    (board[0][0] === player && board[1][1] === player && board[2][2] === player)
  )
}

/**
 * Checks if the game is a tie
 */
export const checkTie = (winnerBoard: SmallBoard): boolean => {
  for (let i = 0; i < boardRowQuantity; i++) {
    for (let j = 0; j < boardRowQuantity; j++) {
      if (winnerBoard[i][j] === '' && getEmptyCellIndexes(winnerBoard).includes(i * 3 + j)) {
        return false
      }
    }
  }
  return true
}

/**
 * Determines which small board index the next move should be restricted to
 */
export const getNextBoardIndex = (board: Board, row: number, col: number) => {
  const index = row * 3 + col

  if (
    checkWin(board[index], 'X') ||
    checkWin(board[index], 'O') ||
    getEmptyCellIndexes(board[index]).length === 0
  ) {
    return null
  }

  return index
}

/**
 * Creates a board showing which small boards have been won by which player
 */
export const getWinnerBoard = (board: Board): SmallBoard => {
  const winBoard: SmallBoard = getEmptySmallBoard()

  for (let i = 0; i < board.length; i++) {
    const x = i % 3
    const y = Math.floor(i / 3)

    if (checkWin(board[i], 'X')) {
      winBoard[y][x] = 'X'
    } else if (checkWin(board[i], 'O')) {
      winBoard[y][x] = 'O'
    }
  }

  return winBoard
}

/**
 * Validates if a move is legal
 */
export const isValidMove = (
  smallBoardIndex: number,
  row: number,
  col: number,
  gameOver: boolean,
  board: Board,
  currentBoard: number | null,
  currentPlayer: Sign,
  player: Sign,
): boolean => {
  const freeCell = board[smallBoardIndex][row][col] === ''
  const validBoardIndex = currentBoard === null || smallBoardIndex === currentBoard
  const validBoard = canMoveToSmallBoard(board[smallBoardIndex])
  const validPlayer = currentPlayer === player

  return freeCell && validBoardIndex && validBoard && validPlayer && !gameOver
}

/**
 * Checks if moves can still be made on a small board
 */
const canMoveToSmallBoard = (board: SmallBoard): boolean => {
  const emptyCells = board.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + Number(cell === ''), 0),
    0,
  )

  return emptyCells > 0 && !checkWin(board, 'X') && !checkWin(board, 'O')
}
