export type Sign = 'X' | 'O' | ''
export type Board = Sign[][][]
export type SmallBoard = Sign[][]

export type CurrentBoardIndex = number | null
export type Position = { smallBoard: number; row: number; cell: number }

export enum GameType {
  SinglePlayer,
  MultiPlayer,
}

export enum SinglePlayerType {
  Easy,
  Medium,
}

export enum MultiPlayerType {
  Local,
  Online,
}
