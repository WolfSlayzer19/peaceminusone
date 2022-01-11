import {defineConfig} from 'vite'
import vue from '@vitejs/plugins-vue'

//https:vitejs.dev/config/
export default defineConfig({
  base: '/myproject/',
  plugins: [vue()]
})
