import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
    base: process.env.VITE_BASE || '/',
    publicDir: 'assets',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                catalog: 'coming-soon.html'
            }
        }
    }
}))