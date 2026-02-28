import { describe, it, expect, vi } from 'vitest'
import ObservableMap from '../../sources/Game/utilities/ObservableMap.js'
import ObservableSet from '../../sources/Game/utilities/ObservableSet.js'

describe('ObservableMap', () => {
    it('should notify on set', () => {
        const callback = vi.fn()
        const map = new ObservableMap(callback)
        map.set('a', 1)
        expect(callback).toHaveBeenCalledWith({ type: 'set', key: 'a', value: 1 })
        expect(map.get('a')).toBe(1)
    })

    it('should notify on delete', () => {
        const callback = vi.fn()
        const map = new ObservableMap(callback)
        map.set('a', 1)
        map.delete('a')
        expect(callback).toHaveBeenCalledWith({ type: 'delete', key: 'a' })
        expect(map.has('a')).toBe(false)
    })

    it('should notify on clear', () => {
        const callback = vi.fn()
        const map = new ObservableMap(callback)
        map.set('a', 1)
        map.clear()
        expect(callback).toHaveBeenCalledWith({ type: 'clear' })
        expect(map.size).toBe(0)
    })
})

describe('ObservableSet', () => {
    it('should notify on add if new', () => {
        const callback = vi.fn()
        const set = new ObservableSet(callback)
        set.add(1)
        expect(callback).toHaveBeenCalledWith({ type: 'add', value: 1 })
        expect(set.has(1)).toBe(true)

        callback.mockClear()
        set.add(1)
        expect(callback).not.toHaveBeenCalled()
    })

    it('should notify on delete if existed', () => {
        const callback = vi.fn()
        const set = new ObservableSet(callback)
        set.add(1)
        callback.mockClear()
        set.delete(1)
        expect(callback).toHaveBeenCalledWith({ type: 'delete', value: 1 })
        expect(set.has(1)).toBe(false)

        callback.mockClear()
        set.delete(1)
        expect(callback).not.toHaveBeenCalled()
    })

    it('should notify on clear if not empty', () => {
        const callback = vi.fn()
        const set = new ObservableSet(callback)
        set.add(1)
        set.add(2)
        callback.mockClear()
        set.clear()
        expect(callback).toHaveBeenCalledWith({ type: 'clear', previousValues: [1, 2] })
        expect(set.size).toBe(0)

        callback.mockClear()
        set.clear()
        expect(callback).not.toHaveBeenCalled()
    })
})
