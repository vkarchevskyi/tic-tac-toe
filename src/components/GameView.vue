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
  type Board,
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
import MediumBot from '@/TicTacToe/AI/MediumBot.ts'
import FillingButton from '@/components/shared/FillingButton.vue'

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

const winner = ref<string | null>(null)
const isTie = ref<boolean>(false)
const gameOver = ref<boolean>(false)

const currentPlayer = ref<Sign>('X')
const currentBoard = ref<CurrentBoardIndex>(null)

let board = reactive(getDefaultBoard())
let winBoard = reactive(getEmptySmallBoard())

const setData = (args: {
  board: Board
  currentPlayer: Sign
  currentBoard: CurrentBoardIndex
  winner: string | null
  isTie: boolean
  gameOver: boolean
}) => {
  currentBoard.value = args.currentBoard
  board = reactive(args.board)
  currentPlayer.value = args.currentPlayer
  winner.value = args.winner
  isTie.value = args.isTie
  gameOver.value = args.gameOver
  winBoard = reactive(getWinnerBoard(board))
}

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
    } else if (checkTie(winBoard)) {
      isTie.value = true
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }

    if (winner.value !== null || isTie.value) {
      gameOver.value = true
    }

    if (props.multiPlayerType === MultiPlayerType.Online) {
      emit('makeMove', position)
    }

    if (!gameOver.value) {
      if (currentPlayer.value === 'O' && props.singlePlayerType !== undefined) {
        setTimeout(() => {
          updateCurrentBoard(position)
          playMove(getBotMove(), 'O')
        }, 200)
      } else {
        updateCurrentBoard(position)
      }

      if (props.multiPlayerType === MultiPlayerType.Local) {
        emit('changePlayer')
      }
    }
  }
}

const getBotMove = (): Position => {
  switch (props.singlePlayerType) {
    case SinglePlayerType.Easy:
      return new EasyBot(board, winBoard).getMove(currentBoard.value)
    case SinglePlayerType.Medium:
      return new MediumBot(board, winBoard).getMove(currentBoard.value)
    default:
      throw new Error('Not implemented yet')
  }
}

const updateCurrentBoard = (position: Position): void => {
  currentBoard.value = getNextBoardIndex(board, position.row, position.cell)
}

const reset = () => {
  if (props.multiPlayerType === MultiPlayerType.Online && !gameOver.value) {
    return
  }

  board = reactive(getDefaultBoard())
  winBoard = reactive(getEmptySmallBoard())
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = null
  isTie.value = false
  currentBoard.value = null

  emit('restartGame')
}

defineExpose({ setData })
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
      :current-player="currentPlayer"
      @playMove="playMove"
    ></GameField>

    <div class="results">
      <p v-if="winner">{{ winner }} wins!</p>
      <p v-else-if="isTie">It's a tie!</p>
      <FillingButton
        @click.prevent="reset"
        v-show="props.multiPlayerType !== MultiPlayerType.Online || gameOver"
      >
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
