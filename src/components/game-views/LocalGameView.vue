<script setup lang="ts">
import GameView from '@/components/GameView.vue'
import { GameType, MultiPlayerType, type Sign } from '@/TicTacToe/types'
import { ref } from 'vue'

const currentPlayer = ref<Sign>('X')

const switchPlayer = () => {
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}
</script>

<template>
  <GameView :game-type="GameType.MultiPlayer" :multi-player-type="MultiPlayerType.Local" :player="currentPlayer"
    @changePlayer="switchPlayer" />
</template>
