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
import FillingButton from '@/components/shared/FillingButton.vue'

type SocketResponse = {
  roomCode: string
  board: Board
  currentPlayer: Sign
  currentBoard: CurrentBoardIndex
  winner: string | null
  isTie: boolean
  gameOver: boolean
}

// https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
const socket = io('https://kit-rapid-subtly.ngrok-free.app', {
  extraHeaders: {
    'ngrok-skip-browser-warning': '12345',
  },
})

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
    <p>
      Your room code:
      <code>{{ personalRoomCode }}</code>
    </p>

    <label for="">
      Your buddy room code:<br />
      <input type="text" v-model="inputRoomCode" /><br />
    </label>
    <FillingButton @click="joinTheRoom" class="button">Join</FillingButton>
  </div>
</template>

<style scoped>
code {
  font-size: 1.25rem;
}

p {
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

label {
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

label input {
  font-size: 1.25rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.125rem;
  margin-top: 1.5rem;
}
</style>
