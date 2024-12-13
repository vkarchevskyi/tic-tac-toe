<script setup lang="ts">
import type { Board } from '@/TicTacToe/types.ts'

defineProps<{ board: Board }>()

defineEmits<{
  playMove: [smallBoardIndex: number, rowIndex: number, cellIndex: number]
}>()
</script>

<template>
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
          @click="$emit('playMove', smallBoardIndex, rowIndex, cellIndex)"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
