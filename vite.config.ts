import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://clinicamedica.somee.com', // URL de la API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la ruta eliminando '/api'
      },
    },
  },
});
