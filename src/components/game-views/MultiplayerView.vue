<script setup lang="ts">
import { io } from 'socket.io-client'
import { ref } from 'vue'
import {
  type Board,
  type CurrentBoardIndex,
  GameType,
  MultiPlayerType,
  type Position,
  type Sign,
} from '@/TicTacToe/types.ts'
import GameView from '@/components/GameView.vue'

type SocketResponse = {
  roomCode: string
  board: Board
  currentPlayer: Sign
  currentBoard: CurrentBoardIndex
  winner: string | null
  isTie: boolean
  gameOver: boolean
}

// TODO: Change to real domain
const socket = io('http://localhost:3000')

const personalRoomCode = ref<string>('')
const inputRoomCode = ref<string>('')
const gameRoomCode = ref<string | null>(null)

const player = ref<Sign>()

const gameView = ref<InstanceType<typeof GameView>>()

const handleSocketResponse = (args: SocketResponse) => {
  if (args.roomCode !== gameRoomCode.value) {
    throw new Error("Room codes don't match")
  }

  gameView.value?.setData(args)
}

socket.on('room-created', (roomCode: string) => {
  personalRoomCode.value = roomCode
})

socket.on(
  'start-game',
  (args: {
    roomCode: string
    board: Board
    currentPlayer: Sign
    currentBoard: CurrentBoardIndex
    player: Sign
  }) => {
    gameRoomCode.value = args.roomCode
    player.value = args.player
  },
)

socket.on('move-made', handleSocketResponse)
socket.on('game-restarted', handleSocketResponse)

socket.emit('create-room')

const joinTheRoom = () => {
  if (personalRoomCode.value !== inputRoomCode.value) {
    socket.emit('join-room', { roomCode: inputRoomCode.value })
  } else {
    inputRoomCode.value = ''
  }
}

const makeMove = (position: Position) => {
  socket.emit('make-move', { roomCode: gameRoomCode.value, position: position })
}

const restartGame = () => {
  socket.emit('restart-game', { roomCode: gameRoomCode.value })
}
</script>

<template>
  <div v-if="gameRoomCode && player">
    <GameView
      ref="gameView"
      :game-type="GameType.MultiPlayer"
      :player="player"
      :multi-player-type="MultiPlayerType.Online"
      :room-code="gameRoomCode"
      :socket="socket"
      @makeMove="makeMove"
      @restartGame="restartGame"
    ></GameView>
  </div>
  <div v-else>
    <p>Personal room code: {{ personalRoomCode }}</p>

    <label for="">
      Room code
      <input type="text" v-model="inputRoomCode" />
      <button @click="joinTheRoom">Join</button>
    </label>
  </div>
</template>

<style scoped></style>
