<script setup lang="ts">
import {
  GameType,
  MultiPlayerType,
  type Position,
  type Sign,
  SinglePlayerType,
} from '@/TicTacToe/types'
import { reactive } from 'vue'
import GameField from '@/components/GameField.vue'
import FillingButton from '@/components/shared/FillingButton.vue'
import { GameService } from '@/TicTacToe/GameService'
import type { GameStateData } from '@/TicTacToe/GameState'

const props = defineProps<{
  gameType: GameType
  player: Sign
  singlePlayerType?: SinglePlayerType
  multiPlayerType?: MultiPlayerType
}>()

const emit = defineEmits<{
  changePlayer: []
  makeMove: [position: Position]
  restartGame: []
}>()

// Initialize game service
const gameService = new GameService(props.singlePlayerType)

// Reactive game state
const gameState = reactive(gameService.getGameState())

const updateGameState = (newState: Partial<GameStateData>) => {
  Object.assign(gameState, newState)
}

const setData = (data: GameStateData) => {
  gameService.setGameState(data)
  updateGameState(data)
}

const playMove = (position: Position, player: Sign) => {
  const moveSuccessful = gameService.makeMove(position, player)

  if (!moveSuccessful) {
    return
  }

  // Update reactive state
  updateGameState(gameService.getGameState())

  // Handle multiplayer move emission
  if (props.multiPlayerType === MultiPlayerType.Online) {
    emit('makeMove', position)
  }

  // Handle bot moves
  if (!gameService.isGameOver() && gameService.isSinglePlayer() && gameState.currentPlayer === 'O') {
    setTimeout(() => {
      const botMove = gameService.getBotMove()
      if (botMove) {
        playMove(botMove, 'O')
      }
    }, 200)
  }

  // Handle local multiplayer player change
  if (props.multiPlayerType === MultiPlayerType.Local && !gameService.isGameOver()) {
    emit('changePlayer')
  }
}

const reset = () => {
  if (props.multiPlayerType === MultiPlayerType.Online && !gameState.gameOver) {
    return
  }

  gameService.reset()
  updateGameState(gameService.getGameState())
  emit('restartGame')
}

defineExpose({ setData })
</script>

<template>
  <div>
    <p class="current-player">
      Current Player: <span class=""> {{ gameState.currentPlayer }} </span>
    </p>
    <GameField :board="gameState.board" :current-board="gameState.currentBoard" :win-board="gameState.winBoard"
      :game-over="gameState.gameOver" :player="player" :current-player="gameState.currentPlayer" @playMove="playMove">
    </GameField>

    <div class="results">
      <p v-if="gameState.winner">{{ gameState.winner }} wins!</p>
      <p v-else-if="gameState.isTie">It's a tie!</p>
      <FillingButton @click.prevent="reset"
        v-show="props.multiPlayerType !== MultiPlayerType.Online || gameState.gameOver">
        Reset Game
      </FillingButton>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.results {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.results p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ddd;
}

.current-player {
  text-align: center;
  color: #ccc;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>
