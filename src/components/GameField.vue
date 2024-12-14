<script setup lang="ts">
import type { Board, Position, SmallBoard } from '@/TicTacToe/types.ts'

defineProps<{
  board: Board
  currentBoard: number | null
  winBoard: SmallBoard
  gameOver: boolean
}>()

defineEmits<{
  playMove: [position: Position]
}>()
</script>

<template>
  <div class="board-wrapper">
    <div
      class="board"
      v-for="(smallBoard, smallBoardIndex) of board"
      :key="smallBoardIndex"
      :class="{
        'current-board': (currentBoard === smallBoardIndex || currentBoard === null) && !gameOver,
        'x-wins': winBoard[Math.floor(smallBoardIndex / 3)][smallBoardIndex % 3] === 'X',
        'o-wins': winBoard[Math.floor(smallBoardIndex / 3)][smallBoardIndex % 3] === 'O',
      }"
    >
      <div class="row" v-for="(row, rowIndex) of smallBoard" :key="rowIndex">
        <div
          class="cell"
          v-for="(cell, cellIndex) of row"
          :key="cellIndex"
          :class="{
            'cell-x': cell === 'X',
            'cell-o': cell === 'O',
          }"
          @click="
            $emit('playMove', {
              smallBoard: smallBoardIndex,
              row: rowIndex,
              cell: cellIndex,
            })
          "
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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.row {
  clear: both;
}

.cell {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  float: left;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #ccc;
  cursor: pointer;
  flex-shrink: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
}

@media screen and (max-width: 667px) {
  .cell {
    width: 9vw;
    height: 9vw;
    font-size: 9vw;
  }
}

@media screen and (max-width: 376px) {
  .cell {
    width: 8vw;
    height: 8vw;
    font-size: 8vw;
  }
}

.cell-x {
  color: var(--x-color);
  cursor: not-allowed;
}

.cell-o {
  color: var(--o-color);
  cursor: not-allowed;
}

.current-board .cell {
  border-color: white;
  border-width: 2px;
}

.x-wins .cell {
  border-color: var(--x-color);
}

.o-wins .cell {
  border-color: var(--o-color);
}
</style>
