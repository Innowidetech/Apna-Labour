import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),       // ✅ add React plugin
    tailwindcss(), // ✅ keep Tailwind plugin
  ],
  server: {
    proxy: {
      // Proxy API requests to backend to avoid CORS
      '/api': {
        target: 'https://apnalabour.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
