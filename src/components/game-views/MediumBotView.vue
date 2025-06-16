<script setup lang="ts">
import GameView from '@/components/GameView.vue'
import { GameType, SinglePlayerType } from '@/TicTacToe/types'
</script>

<template>
  <GameView :game-type="GameType.SinglePlayer" :single-player-type="SinglePlayerType.Medium" player="X" />
</template>
