import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path based on environment
  const base = mode === 'production' ? '/tic-tac-toe/' : '/'

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base,
    define: {
      // Make base path available to the app
      __BASE_PATH__: JSON.stringify(base),
    },
  }
})
