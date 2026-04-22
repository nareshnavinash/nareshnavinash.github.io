import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['tests/setup.js'],
        include: ['tests/**/*.test.js'],
        coverage: {
            provider: 'v8',
            // three-scene.js is excluded: it's a pure WebGL rendering file (Three.js)
            // that requires a real GPU/canvas context and cannot run in jsdom.
            // It contains no business logic - only 3D visuals, shaders, and animation.
            include: [
                'js/profile-render.js',
                'sources/Game/utilities/maths.js',
                'sources/Game/utilities/ObservableMap.js',
                'sources/Game/utilities/ObservableSet.js'
            ],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100
            }
        }
    }
})
