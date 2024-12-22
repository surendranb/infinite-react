import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
   build: {
        copyPublicDir: false,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'public/index.html'),
            },
        },
      external: ['fsevents'],
    },
})