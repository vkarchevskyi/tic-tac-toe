<script setup lang="ts">
import GameView from '@/components/GameView.vue'
import { GameType, SinglePlayerType } from '@/TicTacToe/types.ts'
</script>

<template>
  <GameView
    :game-type="GameType.SinglePlayer"
    :single-player-type="SinglePlayerType.Easy"
    :player="'X'"
  ></GameView>
</template>

<style scoped></style>
