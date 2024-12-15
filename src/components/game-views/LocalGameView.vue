<script setup lang="ts">
import GameView from '@/components/GameView.vue'
import { GameType, MultiPlayerType } from '@/TicTacToe/types.ts'
</script>

<template>
  <GameView
    :game-type="GameType.SinglePlayer"
    :multi-player-type="MultiPlayerType.Local"
    :player="'X'"
  ></GameView>
</template>

<style scoped></style>
