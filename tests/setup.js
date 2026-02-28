// Global test setup - polyfill browser APIs that jsdom lacks

// Track all IntersectionObserver instances for testing
globalThis.__intersectionObservers = []

class MockIntersectionObserver {
    constructor(callback, options) {
        this._callback = callback
        this._options = options
        this._elements = []
        globalThis.__intersectionObservers.push(this)
    }
    observe(el) {
        this._elements.push(el)
    }
    unobserve(el) {
        this._elements = this._elements.filter((e) => e !== el)
    }
    disconnect() {
        this._elements = []
    }

    // Test helper: simulate intersection for all observed elements
    _triggerAll(isIntersecting) {
        const entries = this._elements.map((el) => ({
            isIntersecting,
            target: el
        }))
        if (entries.length > 0) this._callback(entries, this)
    }
}

globalThis.IntersectionObserver = MockIntersectionObserver

// Mock requestAnimationFrame
if (typeof globalThis.requestAnimationFrame === 'undefined') {
    globalThis.requestAnimationFrame = (cb) => {
        cb()
        return 1
    }
}

// Mock matchMedia
if (typeof globalThis.matchMedia === 'undefined') {
    globalThis.matchMedia = () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {}
    })
}
