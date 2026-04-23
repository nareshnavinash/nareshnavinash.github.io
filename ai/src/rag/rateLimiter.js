const STORAGE_KEY = 'naresh_ai_rate'
const MAX_PER_DAY = 10

let memoryFallback = null

function today() {
    return new Date().toISOString().slice(0, 10)
}

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (data.date === today()) return data
        }
    } catch {}
    return { date: today(), count: 0 }
}

function save(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
        memoryFallback = data
    }
}

function getState() {
    if (memoryFallback && memoryFallback.date === today()) return memoryFallback
    return load()
}

export function canQuery() {
    return getState().count < MAX_PER_DAY
}

export function consumeQuery() {
    const state = getState()
    if (state.count >= MAX_PER_DAY) {
        return { remaining: 0, allowed: false }
    }
    state.count++
    save(state)
    return { remaining: MAX_PER_DAY - state.count, allowed: true }
}

export function getRemaining() {
    return MAX_PER_DAY - getState().count
}

export function getMax() {
    return MAX_PER_DAY
}
