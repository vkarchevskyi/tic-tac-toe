export type Sign = 'X' | 'O' | ''
export type Board = Sign[][][]
export type SmallBoard = Sign[][]

export type CurrentBoardIndex = number | null
export type Position = { smallBoard: number; row: number; cell: number }

export type MiniMaxMove = { index?: number; score: number }

export enum GameType {
  SinglePlayer = 1,
  MultiPlayer = 2,
}

export enum SinglePlayerType {
  Easy = 1,
  Medium = 2,
}

export enum MultiPlayerType {
  Local = 1,
  Online = 2,
}
