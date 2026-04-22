import 'dotenv/config'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import restart from 'vite-plugin-restart'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const sourcesDir = fileURLToPath(new URL('./sources/', import.meta.url))

export default {
    root: 'sources/',
    envDir: '../',
    publicDir: '../static/',
    base: './',
    server: {
        host: true,
        open: true
    },
    build: {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            input: {
                index: resolve(sourcesDir, 'index.html'),
                world: resolve(sourcesDir, 'world.html')
            }
        }
    },
    plugins: [
        wasm(),
        topLevelAwait(),
        restart({ restart: ['../static/**'] }),
        nodePolyfills()
        // basicSsl()
    ]
}
