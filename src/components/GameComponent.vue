<script setup lang="ts">
import {
  checkTie,
  checkWin,
  getDefaultBoard,
  getEmptySmallBoard,
  getNextBoardIndex,
  getWinnerBoard,
  isValidMove,
} from '@/TicTacToe/GameController'
import {
  type CurrentBoardIndex,
  GameType,
  MultiPlayerType,
  type Position,
  type Sign,
  SinglePlayerType,
} from '@/TicTacToe/types'
import { reactive, ref } from 'vue'
import GameField from '@/components/GameField.vue'
import EasyBot from '@/TicTacToe/AI/EasyBot.ts'

const props = defineProps<{
  gameType: GameType
  singlePlayerType: SinglePlayerType | null
  multiPlayerType: MultiPlayerType | null
  player: Sign
}>()

const winner = ref<string | null>(null)
const isTie = ref<boolean>(false)
const gameOver = ref<boolean>(false)

const currentPlayer = ref<Sign>('X')
const currentBoard = ref<CurrentBoardIndex>(null)

let board = reactive(getDefaultBoard())
let winBoard = reactive(getEmptySmallBoard())

const playMove = (position: Position, player: Sign) => {
  const validMove = isValidMove(
    position.smallBoard,
    position.row,
    position.cell,
    gameOver.value,
    board,
    currentBoard.value,
    currentPlayer.value,
    player,
  )

  if (validMove) {
    board[position.smallBoard][position.row][position.cell] = currentPlayer.value
    winBoard = reactive(getWinnerBoard(board))

    if (checkWin(winBoard, currentPlayer.value)) {
      winner.value = currentPlayer.value
      gameOver.value = true
    } else if (checkTie(board)) {
      isTie.value = true
      gameOver.value = true
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }

    currentBoard.value = getNextBoardIndex(board, position.row, position.cell)

    if (props.singlePlayerType !== null) {
      makeBotMove()
    }
  }
}

const makeBotMove = (): void => {
  switch (props.singlePlayerType) {
    case SinglePlayerType.Easy:
      playMove(new EasyBot(board, winBoard).getMove(currentBoard.value), 'O')
      break
    case SinglePlayerType.Medium:
      break
    default:
      break
  }
}

const reset = () => {
  board = reactive(getDefaultBoard())
  winBoard = reactive(getEmptySmallBoard())
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = null
  isTie.value = false
  currentBoard.value = null
}
</script>

<template>
  <div>
    <p class="current-player">
      Current Player: <span class=""> {{ currentPlayer }} </span>
    </p>
    <GameField
      :board="board"
      :current-board="currentBoard"
      :win-board="winBoard"
      :game-over="gameOver"
      :player="player"
      @playMove="playMove"
    ></GameField>

    <div class="">
      <p v-if="winner">{{ winner }} wins!</p>
      <p v-else-if="isTie">It's a tie!</p>
      <button @click="reset">Reset Game</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.current-player {
  text-align: center;
  color: #ccc;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>
