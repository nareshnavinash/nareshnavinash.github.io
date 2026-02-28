export function lerp(a, b, t) {
    return a + (b - a) * t
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

export function remap(value, inMin, inMax, outMin, outMax) {
    const t = clamp((value - inMin) / (inMax - inMin), 0, 1)
    return outMin + t * (outMax - outMin)
}

export function smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)
}

export function dampedLerp(current, target, lambda, dt) {
    return lerp(current, target, 1 - Math.exp(-lambda * dt))
}
