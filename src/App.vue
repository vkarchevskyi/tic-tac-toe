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
  board = getDefaultBoard()
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = null
  isTie.value = false
}
</script>

<template>
  <div>
    <h1 class="">TicTac Game</h1>
    <p class="">
      Current Player: <span class=""> {{ currentPlayer }} </span>
    </p>
    <div class="board-wrapper">
      <div class="board" v-for="(smallBoard, smallBoardIndex) of board" :key="smallBoardIndex">
        <div class="row" v-for="(row, rowIndex) of smallBoard" :key="rowIndex">
          <div
            class="cell"
            v-for="(cell, cellIndex) of row"
            :key="cellIndex"
            :class="{
              'cell-x': cell === 'X',
              'cell-o': cell === 'O',
            }"
            :disabled="cell !== null"
            @click="playMove(smallBoardIndex, rowIndex, cellIndex)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <p v-if="winner">{{ winner }} wins!</p>
      <p v-else-if="isTie">It's a tie!</p>
      <button @click="reset">Reset Game</button>
    </div>
  </div>
</template>

<style>
.board-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}

.row {
  clear: both;
}

.cell {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: -1px;
  margin-bottom: -1px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #bbb;
  cursor: pointer;
  font-size: 40px;
}

.cell-x {
  color: #f00;
}

.cell-o {
  color: #00f;
}

button {
  margin-top: 20px;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
}
</style>
