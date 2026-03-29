import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',   // must match your GitHub repo name exactly
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
})