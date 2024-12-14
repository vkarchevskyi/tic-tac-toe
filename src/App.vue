<script setup lang="ts">
import Game from '@/components/GameComponent.vue'
import { GameType, MultiPlayerType, SinglePlayerType } from '@/TicTacToe/types.ts'
import { ref } from 'vue'
import DynamicButton from '@/components/DynamicButton.vue'

const gameType = ref<GameType>()
const singlePlayerType = ref<SinglePlayerType | null>(null)
const multiPlayerType = ref<MultiPlayerType | null>(null)
</script>

<template>
  <div class="wrapper">
    <h1 class="">Ultimate Tic-Tac-Toe</h1>

    <div class="game-type" v-if="gameType === undefined">
      <DynamicButton @click="gameType = GameType.SinglePlayer" :with-dynamic-border="true">
        Singleplayer
      </DynamicButton>
      <DynamicButton @click="gameType = GameType.MultiPlayer" :with-dynamic-border="true">
        Multiplayer
      </DynamicButton>
    </div>

    <div
      class="game-type"
      v-if="
        gameType === GameType.SinglePlayer && singlePlayerType === null && multiPlayerType === null
      "
    >
      <DynamicButton @click="singlePlayerType = SinglePlayerType.Easy" :with-dynamic-border="false">
        AI Easy
      </DynamicButton>
      <DynamicButton
        @click="singlePlayerType = SinglePlayerType.Medium"
        :with-dynamic-border="false"
      >
        AI Medium
      </DynamicButton>
    </div>

    <div
      class="game-type"
      v-if="
        gameType === GameType.MultiPlayer && singlePlayerType === null && multiPlayerType === null
      "
    >
      <DynamicButton
        @click="multiPlayerType = MultiPlayerType.Local"
        :with-dynamic-border="false"
        :class="'full-width-button'"
      >
        Local
      </DynamicButton>
    </div>

    <Game
      v-if="gameType !== undefined && (singlePlayerType !== null || multiPlayerType !== null)"
      :game-type="gameType"
      :single-player-type="singlePlayerType"
      :multi-player-type="multiPlayerType"
      :player="'X'"
    >
    </Game>
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

.full-width-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
