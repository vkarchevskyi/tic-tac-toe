import { type Board, type Sign, type SmallBoard } from '@/TicTacToe/types'

export const boardSize: number = 9
export const boardRowQuantity: number = 3

export const getDefaultBoard = (): Sign[][][] => {
  const board: Board = []

  for (let i = 0; i < boardSize; i++) {
    const smallBoard: SmallBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]

    board.push(smallBoard)
  }

  return board
}

export const getNextBoardIndex = (board: Board, row: number, col: number) => {
  const index = row * 3 + col

  if (checkSmallBoardWin(board[index], 'X') || checkSmallBoardWin(board[index], 'O')) {
    return null
  }

  return index
}

export const isValidMove = (
  smallBoardIndex: number,
  row: number,
  col: number,
  gameOver: boolean,
  board: Board,
  currentBoard: number | null,
): boolean => {
  const freeCell = board[smallBoardIndex][row][col] === ''
  const validBoardIndex = currentBoard === null || smallBoardIndex === currentBoard
  const validBoard = canMoveToSmallBoard(board[smallBoardIndex])

  return freeCell && validBoardIndex && validBoard && !gameOver
}

export const checkTie = (board: Board): boolean => {
  for (let i = 0; i < boardRowQuantity; i++) {
    for (let j = 0; j < boardRowQuantity; j++) {
      for (let k = 0; k < boardRowQuantity; k++) {
        if (!board[i][j][k]) {
          return false
        }
      }
    }
  }
  return true
}

export const checkWin = (board: Board, player: Sign): boolean => {
  const winBoard = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]

  for (let i = 0; i < board.length; i++) {
    const x = i % 3
    const y = Math.floor(i / 3)

    winBoard[y][x] = checkSmallBoardWin(board[i], player)
  }

  return checkBoardWin(winBoard)
}

const checkSmallBoardWin = (board: SmallBoard, player: Sign): boolean => {
  for (let i = 0; i < boardRowQuantity; i++) {
    if (board[i].every((cell): boolean => cell === player)) return true
    if (board.every((row): boolean => row[i] === player)) return true
  }

  return (
    (board[0][2] === player && board[1][1] === player && board[2][0] === player) ||
    (board[0][0] === player && board[1][1] === player && board[2][2] === player)
  )
}

const checkBoardWin = (winBoard: boolean[][]): boolean => {
  for (let i = 0; i < boardRowQuantity; i++) {
    if (winBoard[i].every((cell): boolean => cell)) return true
    if (winBoard.every((row): boolean => row[i])) return true
  }

  return (
    (winBoard[0][2] && winBoard[1][1] && winBoard[2][0]) ||
    (winBoard[0][0] && winBoard[1][1] && winBoard[2][2])
  )
}

const canMoveToSmallBoard = (board: SmallBoard): boolean => {
  const emptyCells = board.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + Number(cell === ''), 0),
    0,
  )

  return emptyCells > 0 && !checkSmallBoardWin(board, 'X') && !checkSmallBoardWin(board, 'O')
}
