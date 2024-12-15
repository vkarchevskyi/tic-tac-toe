import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import SelectMode from '@/components/SelectModeView.vue'
import EasyBotView from '@/components/game-views/EasyBotView.vue'
import MediumBotView from '@/components/game-views/MediumBotView.vue'
import LocalGameView from '@/components/game-views/LocalGameView.vue'
import MultiplayerView from '@/components/game-views/MultiplayerView.vue'

const base: string = '/tic-tac-toe'

const routes: RouteRecordRaw[] = [
  { path: base + '/', component: SelectMode },
  { path: base + '/bot/easy', component: EasyBotView },
  { path: base + '/bot/medium', component: MediumBotView },
  { path: base + '/local', component: LocalGameView },
  { path: base + '/multiplayer', component: MultiplayerView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
