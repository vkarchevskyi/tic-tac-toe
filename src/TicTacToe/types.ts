export type Sign = 'X' | 'O' | ''
export type Board = Sign[][][]
export type SmallBoard = Sign[][]

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
