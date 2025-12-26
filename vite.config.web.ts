import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Vite config for standalone web version (no Electron)
export default defineConfig({
    plugins: [vue()],
    root: resolve(__dirname, 'src/renderer'),
    base: './',
    build: {
        outDir: resolve(__dirname, 'dist-web'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/renderer/index.html')
            }
        }
    },
    resolve: {
        alias: {
            '@renderer': resolve(__dirname, 'src/renderer/src'),
            '@': resolve(__dirname, 'src/renderer/src')
        }
    },
    server: {
        port: 3000
    }
})
