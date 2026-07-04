import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    // Убираем manualChunks, чтобы всё было в одном-двух файлах
    // Это решит проблему с "createContext of undefined"
    rollupOptions: {
      output: {
        manualChunks: undefined, 
      },
    },
    chunkSizeWarningLimit: 2000, // Просто игнорируем ворнинг, для IPFS это ок
  },
})

