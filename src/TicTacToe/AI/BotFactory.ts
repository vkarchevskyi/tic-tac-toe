import type { Board, SmallBoard } from '../types'
import { SinglePlayerType } from '../types'
import type Bot from './Bot'
import EasyBot from './EasyBot'
import MediumBot from './MediumBot'

export class BotFactory {
  static createBot(type: SinglePlayerType, board: Board, winBoard: SmallBoard): Bot {
    switch (type) {
      case SinglePlayerType.Easy:
        return new EasyBot(board, winBoard)
      case SinglePlayerType.Medium:
        return new MediumBot(board, winBoard)
      default:
        throw new Error(`Unsupported bot type: ${type}`)
    }
  }
}
