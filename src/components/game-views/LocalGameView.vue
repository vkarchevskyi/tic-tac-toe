<script setup lang="ts">
import GameView from '@/components/GameView.vue'
import { GameType, MultiPlayerType, type Sign } from '@/TicTacToe/types.ts'
import { ref } from 'vue'

const player = ref<Sign>('X')

const changePlayer = () => {
  player.value = player.value === 'X' ? 'O' : 'X'
}
</script>

<template>
  <GameView
    :game-type="GameType.SinglePlayer"
    :multi-player-type="MultiPlayerType.Local"
    :player="player"
    @changePlayer="changePlayer()"
  ></GameView>
</template>

<style scoped></style>
