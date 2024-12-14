<script setup lang="ts">
import {
  checkTie,
  checkWin,
  getDefaultBoard,
  getNextBoardIndex,
  isValidMove,
} from '@/TicTacToe/GameController'
import { type Sign } from '@/TicTacToe/types'
import { reactive, ref } from 'vue'
import GameField from '@/components/GameField.vue'

const winner = ref<string | null>(null)
const isTie = ref<boolean>(false)
const gameOver = ref<boolean>(false)
const currentPlayer = ref<Sign>('X')

const currentBoard = ref<number | null>(null)

let board = reactive(getDefaultBoard())

const playMove = (smallBoardIndex: number, row: number, col: number) => {
  const validMove = isValidMove(
    smallBoardIndex,
    row,
    col,
    gameOver.value,
    board,
    currentBoard.value,
  )

  if (validMove) {
    board[smallBoardIndex][row][col] = currentPlayer.value

    if (checkWin(board, currentPlayer.value)) {
      winner.value = currentPlayer.value
      gameOver.value = true
    } else if (checkTie(board)) {
      isTie.value = true
      gameOver.value = true
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }

    currentBoard.value = getNextBoardIndex(board, row, col)
  }
}

const reset = () => {
  board = reactive(getDefaultBoard())
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = null
  isTie.value = false
  currentBoard.value = null
}
</script>

<template>
  <div>
    <h1 class="">Ultimate Tic-Tac-Toe</h1>
    <p class="current-player">
      Current Player: <span class=""> {{ currentPlayer }} </span>
    </p>
    <GameField @playMove="playMove" :board="board" :current-board="currentBoard"></GameField>

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
