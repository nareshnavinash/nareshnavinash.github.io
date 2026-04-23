import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode || 'production', resolve(__dirname, '..'), 'VITE_')
    return {
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.js'),
                formats: ['es'],
                fileName: () => 'naresh-ai.mjs'
            },
            outDir: resolve(__dirname, '../js'),
            emptyOutDir: false,
            target: 'esnext',
            minify: 'esbuild',
            sourcemap: false
        },
        define: {
            'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
            'import.meta.env.VITE_GROQ_API_KEY': JSON.stringify(env.VITE_GROQ_API_KEY || '')
        }
    }
})
