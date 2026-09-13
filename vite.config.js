import { defineConfig } from 'vite'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import Sitemap from 'vite-plugin-sitemap'
import { imagetools } from 'vite-imagetools'

export default defineConfig(({ mode }) => ({
    root: 'src',
    base: './', // Ensures relative paths for cPanel
    publicDir: '../public', // Assets and API copied cleanly to root of dist/
    resolve: {
        alias: {
            '/assets': resolve(__dirname, 'src/assets')
        }
    },
    plugins: [
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
        }),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: 'SolunTek | Solutions IT & Digitales',
                    description: 'SolunTek fournit des solutions IT complètes: infrastructure réseau, CCTV, contrôle d\'accès, systèmes d\'alarme et bureautique. Ingénié pour durer.',
                    ogImage: '/assets/images/og-soluntek.jpg'
                }
            }
        }),
        Sitemap({
            hostname: 'https://soluntek.com',
            outDir: resolve(__dirname, 'dist'),
            dynamicRoutes: [
                '/',
                '/coming-soon.html'
            ]
        }),
        imagetools()
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                catalog: resolve(__dirname, 'src/coming-soon.html')
            }
        }
    }
}))