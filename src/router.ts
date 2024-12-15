import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import SelectMode from '@/components/SelectModeView.vue'
import EasyBotView from '@/components/game-views/EasyBotView.vue'
import MediumBotView from '@/components/game-views/MediumBotView.vue'
import LocalGameView from '@/components/game-views/LocalGameView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: SelectMode },
  { path: '/bot/easy', component: EasyBotView },
  { path: '/bot/medium', component: MediumBotView },
  { path: '/local', component: LocalGameView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
