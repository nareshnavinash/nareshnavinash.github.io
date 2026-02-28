import { describe, it, expect } from 'vitest'
import {
    clamp,
    remap,
    remapClamp,
    lerp,
    smoothstep,
    safeMod,
    signedModDelta,
    smallestAngle,
    segmentCircleIntersection,
    dist,
    lineIntersectsCircle,
    pointInPolygon,
    circleIntersectsPolygon
} from '../../sources/Game/utilities/maths.js'

describe('maths.js', () => {
    describe('clamp()', () => {
        it('should clamp value to min', () => {
            expect(clamp(5, 10, 20)).toBe(10)
        })
        it('should clamp value to max', () => {
            expect(clamp(25, 10, 20)).toBe(20)
        })
        it('should return value when within range', () => {
            expect(clamp(15, 10, 20)).toBe(15)
        })
    })

    describe('remap()', () => {
        it('should map value from one range to another', () => {
            expect(remap(5, 0, 10, 0, 100)).toBe(50)
            expect(remap(2, 0, 10, 0, 1)).toBe(0.2)
        })
    })

    describe('remapClamp()', () => {
        it('should map and clamp value', () => {
            expect(remapClamp(5, 0, 10, 0, 100)).toBe(50)
            expect(remapClamp(-1, 0, 10, 0, 100)).toBe(0)
            expect(remapClamp(11, 0, 10, 0, 100)).toBe(100)
        })
        it('should handle inverted output range', () => {
            expect(remapClamp(0, 0, 10, 100, 0)).toBe(100)
            expect(remapClamp(10, 0, 10, 100, 0)).toBe(0)
            expect(remapClamp(11, 0, 10, 100, 0)).toBe(0)
        })
    })

    describe('lerp()', () => {
        it('should linearly interpolate between two values', () => {
            expect(lerp(0, 10, 0.5)).toBe(5)
            expect(lerp(10, 20, 0.1)).toBe(11)
        })
    })

    describe('smoothstep()', () => {
        it('should return 0 for values below min', () => {
            expect(smoothstep(0, 10, 20)).toBe(0)
        })
        it('should return 1 for values above max', () => {
            expect(smoothstep(30, 10, 20)).toBe(1)
        })
        it('should return 0.5 for value at midpoint', () => {
            expect(smoothstep(15, 10, 20)).toBe(0.5)
        })
    })

    describe('safeMod()', () => {
        it('should return positive modulo for positive numbers', () => {
            expect(safeMod(5, 3)).toBe(2)
        })
        it('should return positive modulo for negative numbers', () => {
            expect(safeMod(-1, 3)).toBe(2)
        })
    })

    describe('signedModDelta()', () => {
        it('should return shortest distance in modulo space', () => {
            expect(signedModDelta(1, 4, 10)).toBe(3)
            expect(signedModDelta(9, 1, 10)).toBe(2)
            expect(signedModDelta(1, 9, 10)).toBe(-2)
        })
    })

    describe('segmentCircleIntersection()', () => {
        it('should return intersections when segment crosses circle', () => {
            const intersections = segmentCircleIntersection(-2, 0, 2, 0, 0, 0, 1)
            expect(intersections).toHaveLength(2)
            expect(intersections[0].x).toBeCloseTo(-1)
            expect(intersections[1].x).toBeCloseTo(1)
        })

        it('should return one intersection when segment starts inside', () => {
            const intersections = segmentCircleIntersection(0, 0, 2, 0, 0, 0, 1)
            expect(intersections).toHaveLength(1)
            expect(intersections[0].x).toBeCloseTo(1)
        })

        it('should return no intersections when segment is outside', () => {
            const intersections = segmentCircleIntersection(2, 0, 4, 0, 0, 0, 1)
            expect(intersections).toHaveLength(0)
        })

        it('should return no intersections when discriminant is negative', () => {
            const intersections = segmentCircleIntersection(-2, 2, 2, 2, 0, 0, 1)
            expect(intersections).toHaveLength(0)
        })

        it('should handle tangent segments', () => {
            // Discriminant will be 0
            const intersections = segmentCircleIntersection(-2, 1, 2, 1, 0, 0, 1)
            expect(intersections).toHaveLength(1)
            expect(intersections[0].x).toBeCloseTo(0)
            expect(intersections[0].y).toBeCloseTo(1)
        })
    })

    describe('smallestAngle()', () => {
        it('should return shortest angular distance', () => {
            expect(smallestAngle(0, Math.PI)).toBe(-Math.PI)
            expect(smallestAngle(0, -Math.PI)).toBe(-Math.PI)
            expect(smallestAngle(0.1, 0.2)).toBeCloseTo(0.1)
            expect(smallestAngle(Math.PI - 0.1, -Math.PI + 0.1)).toBeCloseTo(0.2)
        })
    })

    describe('dist()', () => {
        it('should calculate distance between two points', () => {
            expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
        })
    })

    describe('lineIntersectsCircle()', () => {
        it('should return true if line segment intersects circle', () => {
            const center = { x: 0, y: 0 }
            const radius = 1
            expect(lineIntersectsCircle({ x: -2, y: 0 }, { x: 2, y: 0 }, center, radius)).toBe(true)
            expect(lineIntersectsCircle({ x: 0, y: -2 }, { x: 0, y: 2 }, center, radius)).toBe(true)
        })
        it('should return true if one endpoint is inside', () => {
            const center = { x: 0, y: 0 }
            const radius = 1
            expect(lineIntersectsCircle({ x: 0, y: 0 }, { x: 2, y: 0 }, center, radius)).toBe(true)
        })
        it('should return false if line is outside', () => {
            const center = { x: 0, y: 0 }
            const radius = 1
            expect(lineIntersectsCircle({ x: 2, y: 0 }, { x: 4, y: 0 }, center, radius)).toBe(false)
            expect(lineIntersectsCircle({ x: -2, y: 2 }, { x: 2, y: 2 }, center, radius)).toBe(false)
        })
    })

    describe('pointInPolygon()', () => {
        const poly = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 10, y: 10 },
            { x: 0, y: 10 }
        ]
        it('should return true for point inside', () => {
            expect(pointInPolygon({ x: 5, y: 5 }, poly)).toBe(true)
        })
        it('should return false for point outside', () => {
            expect(pointInPolygon({ x: 15, y: 5 }, poly)).toBe(false)
            expect(pointInPolygon({ x: 5, y: 15 }, poly)).toBe(false)
        })
    })

    describe('circleIntersectsPolygon()', () => {
        const poly = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 10, y: 10 },
            { x: 0, y: 10 }
        ]
        it('should return true if circle center is inside', () => {
            expect(circleIntersectsPolygon({ x: 5, y: 5 }, 1, poly)).toBe(true)
        })
        it('should return true if circle overlaps edge', () => {
            expect(circleIntersectsPolygon({ x: -0.5, y: 5 }, 1, poly)).toBe(true)
        })
        it('should return true if circle contains vertex', () => {
            expect(circleIntersectsPolygon({ x: -0.5, y: -0.5 }, 1, poly)).toBe(true)
        })
        it('should return false if circle is completely outside', () => {
            expect(circleIntersectsPolygon({ x: -2, y: 5 }, 1, poly)).toBe(false)
        })
    })
})
