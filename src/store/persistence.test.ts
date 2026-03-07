import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState } from './persistence'
import { createMockCartItem, createMockOrder } from '../test/factories'

const mockState = {
  cart: {
    items: [
      createMockCartItem({ menuItem: { id: 'test-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 2 }),
    ],
  },
  history: {
    orders: [
      createMockOrder({
        id: 'order-1',
        items: [
          createMockCartItem({ menuItem: { id: 'test-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 1 }),
        ],
        totalAmount: 9.99,
      }),
    ],
  },
}

describe('persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadState', () => {
    it('should return undefined when localStorage is empty', () => {
      expect(loadState()).toBeUndefined()
    })

    it('should return parsed state when valid JSON exists', () => {
      localStorage.setItem('foodOrderState', JSON.stringify(mockState))
      const result = loadState()
      expect(result).toEqual(mockState)
    })

    it('should return undefined on malformed JSON', () => {
      localStorage.setItem('foodOrderState', 'not-valid-json')
      expect(loadState()).toBeUndefined()
    })
  })

  describe('saveState', () => {
    it('should write serialized state to localStorage', () => {
      saveState(mockState)
      const stored = localStorage.getItem('foodOrderState')
      expect(stored).not.toBeNull()
      expect(JSON.parse(stored!)).toEqual(mockState)
    })
  })
})
