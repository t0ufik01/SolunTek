import { defineConfig } from 'vite';

export default defineConfig({
    // Serve /assets/* directly at root (e.g. /assets/partners/geoxal.svg)
    publicDir: 'assets',
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0, // Keep SVGs as separate files, do not inline
        rollupOptions: {
            input: {
                main: 'index.html',
                catalog: 'coming-soon.html',
            },
        },
    },
    server: {
        port: 5173,
        open: true,
    },
});
