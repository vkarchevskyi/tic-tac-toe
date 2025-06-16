import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import SelectMode from '@/components/SelectModeView.vue'
import EasyBotView from '@/components/game-views/EasyBotView.vue'
import MediumBotView from '@/components/game-views/MediumBotView.vue'
import LocalGameView from '@/components/game-views/LocalGameView.vue'
import MultiplayerView from '@/components/game-views/MultiplayerView.vue'

// Use the base path injected by Vite
const base: string = __BASE_PATH__

const routes: RouteRecordRaw[] = [
  { path: '/', component: SelectMode },
  { path: '/bot/easy', component: EasyBotView },
  { path: '/bot/medium', component: MediumBotView },
  { path: '/local', component: LocalGameView },
  { path: '/multiplayer', component: MultiplayerView },
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

export default router
