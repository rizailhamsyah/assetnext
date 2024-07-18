import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: true,
    rollupOptions: {
      input: 
      {
        main: path.resolve(__dirname, 'src/pages/_app.tsx'),
        lessons: path.resolve(__dirname, 'src/pages/_app.tsx'),
        locations: path.resolve(__dirname, 'src/pages/_app.tsx'),
        schedule: path.resolve(__dirname, 'src/pages/_app.tsx')
      },
    }
  },
  preview: {
    port: Number(process.env.PORT) || 3000,
  },
})