import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// custom
import Unocss from 'unocss/vite';
/* global process */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss()
  ],
  base: process.env.NODE_ENV === "production" ? "/vue2023-week2/" : "/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
