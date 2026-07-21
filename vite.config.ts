import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
  base: '/Employee_Dashboard/'
    server: {
        port: 50207,
    }
})
