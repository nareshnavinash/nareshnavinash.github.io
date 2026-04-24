import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/docs/**',
            '**/static/**',
            '**/coverage/**',
            '**/.claude/**',
            '**/.playwright/**',
            '**/.playwright-mcp/**',
            'package-lock.json',
            'js/naresh-ai.mjs'
        ]
    },
    js.configs.recommended,
    prettierConfig,
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                IntersectionObserver: 'readonly',
                DOMParser: 'readonly',
                StorageEvent: 'readonly',
                KeyboardEvent: 'readonly',
                Event: 'readonly',
                HTMLElement: 'readonly',
                Node: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                fetch: 'readonly',
                Promise: 'readonly',
                URL: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
                Float32Array: 'readonly',
                Math: 'readonly',
                Date: 'readonly',
                JSON: 'readonly',
                innerWidth: 'readonly',
                innerHeight: 'readonly',
                devicePixelRatio: 'readonly',
                MutationObserver: 'readonly',
                HTMLCanvasElement: 'readonly',
                ImageData: 'readonly',
                HTMLImageElement: 'readonly',
                ImageBitmap: 'readonly',
                HTMLVideoElement: 'readonly',
                VideoFrame: 'readonly',
                CustomEvent: 'readonly',
                AbortController: 'readonly',
                AbortSignal: 'readonly',
                Request: 'readonly',
                Headers: 'readonly',
                Response: 'readonly',
                ReadableStream: 'readonly',
                ProgressEvent: 'readonly',
                TextDecoder: 'readonly',
                performance: 'readonly',
                self: 'readonly',
                createImageBitmap: 'readonly',
                btoa: 'readonly',
                atob: 'readonly',
                XMLHttpRequest: 'readonly',
                WebAssembly: 'readonly',
                global: 'readonly',
                addEventListener: 'readonly',
                removeEventListener: 'readonly',
                location: 'readonly',
                WebSocket: 'readonly',
                Image: 'readonly',
                Audio: 'readonly',
                scrollY: 'readonly',
                URLSearchParams: 'readonly',
                Blob: 'readonly',
                Map: 'readonly',
                Set: 'readonly',
                WeakMap: 'readonly',
                Uint8Array: 'readonly',
                ArrayBuffer: 'readonly'
            }
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off',
            'import/no-unresolved': 'off', // Vite handles this
            'no-self-assign': 'off',
            'no-constant-condition': 'off',
            'no-unreachable': 'warn',
            'no-empty': 'warn',
            'prettier/prettier': 'error'
        }
    },
    {
        files: ['scripts/**/*.js', 'vitest.config.js', 'vite.config.js', 'eslint.config.js'],
        languageOptions: {
            globals: {
                process: 'readonly',
                __dirname: 'readonly',
                Buffer: 'readonly',
                module: 'readonly',
                require: 'readonly'
            }
        }
    },
    {
        files: ['tests/**/*.test.js'],
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules
        }
    }
]
