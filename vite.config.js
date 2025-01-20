import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/main/', // Substitua pelo nome do seu repositório
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
