import type { Position, Sign, SinglePlayerType } from './types'
import { GameEngine } from './GameEngine'
import type { GameStateData } from './GameState'
import { BotFactory } from './AI/BotFactory'

export class GameService {
  private gameEngine: GameEngine
  private singlePlayerType?: SinglePlayerType

  constructor(singlePlayerType?: SinglePlayerType) {
    this.gameEngine = new GameEngine()
    this.singlePlayerType = singlePlayerType
  }

  makeMove(position: Position, player: Sign): boolean {
    return this.gameEngine.makeMove(position, player)
  }

  getBotMove(): Position | null {
    if (!this.singlePlayerType) {
      return null
    }

    const gameState = this.gameEngine.getGameState()
    const bot = BotFactory.createBot(this.singlePlayerType, gameState.board, gameState.winBoard)
    return bot.getMove(gameState.currentBoard)
  }

  getGameState(): GameStateData {
    return this.gameEngine.getGameState()
  }

  setGameState(data: Partial<GameStateData>): void {
    this.gameEngine.setGameState(data)
  }

  reset(): void {
    this.gameEngine.reset()
  }

  isGameOver(): boolean {
    return this.gameEngine.isGameOver()
  }

  getCurrentPlayer(): Sign {
    return this.gameEngine.getCurrentPlayer()
  }

  isSinglePlayer(): boolean {
    return this.singlePlayerType !== undefined
  }
}
