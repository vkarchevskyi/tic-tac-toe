<script setup lang="ts">
import Game from '@/components/GameComponent.vue'
import { GameType } from '@/TicTacToe/types.ts'
import { ref } from 'vue'
import DynamicButton from '@/components/DynamicButton.vue'

const gameType = ref<GameType>()
</script>

<template>
  <div class="wrapper">
    <h1 class="">Ultimate Tic-Tac-Toe</h1>

    <div class="game-type" v-if="gameType === undefined">
      <DynamicButton @click="gameType = GameType.SinglePlayer">Singleplayer</DynamicButton>
      <DynamicButton @click="gameType = GameType.MultiPlayer">Multiplayer</DynamicButton>
    </div>
    <Game v-if="gameType !== undefined"></Game>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.game-type {
  display: flex;
  column-gap: 1rem;
  justify-content: space-between;
}
</style>
