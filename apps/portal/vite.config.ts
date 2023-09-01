import path from 'path'
import {
  defineConfig,
} from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults'],
    }),
    react(),
  ],
  build: {
    outDir: path.resolve(
      process.env.INIT_CWD || './',
      './dist/pby',
    ),
  },
  resolve: {
    alias: {
      '@': path.resolve(
        __dirname,
        './src',
      ),
    },
  },
})
