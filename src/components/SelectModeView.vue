<script setup lang="ts">
import { GameType } from '@/TicTacToe/types.ts'
import { ref } from 'vue'
import DynamicButton from '@/components/DynamicButton.vue'
import DynamicLink from '@/components/DynamicLink.vue'

const gameType = ref<GameType>()
</script>

<template>
  <div class="wrapper">
    <div class="game-type" v-if="gameType === undefined">
      <DynamicButton @click="gameType = GameType.SinglePlayer"> Singleplayer</DynamicButton>
      <DynamicButton @click="gameType = GameType.MultiPlayer"> Multiplayer</DynamicButton>
    </div>

    <div class="game-type" v-if="gameType === GameType.SinglePlayer">
      <DynamicLink :to="'/bot/easy'"> AI Easy</DynamicLink>
      <DynamicLink :to="'/bot/medium'"> AI Medium</DynamicLink>
    </div>

    <div class="game-type" v-if="gameType === GameType.MultiPlayer">
      <DynamicLink :to="'/local'"> Local</DynamicLink>
      <DynamicLink :to="'/multiplayer'"> Multiplayer</DynamicLink>
    </div>
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
