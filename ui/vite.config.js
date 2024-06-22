import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // resolve "@" - required for css imports
      "@": path.resolve(__dirname, "src"),
      // we need to use the vue build with the runtime template compiler included, otherwise vue will complain about the needing the runtime template compiler or to pre-compile the templates
      vue: 'vue/dist/vue.esm.js',
    }
  },
})
