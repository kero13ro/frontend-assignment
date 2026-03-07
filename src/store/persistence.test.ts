import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState } from './persistence'
import type { RootState } from '.'

const mockState: RootState = {
  cart: {
    items: [
      { menuItem: { id: 'test-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 2 },
    ],
  },
  history: {
    orders: [
      {
        id: 'order-1',
        items: [
          { menuItem: { id: 'test-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 1 },
        ],
        totalAmount: 9.99,
        submittedAt: '2026-03-07T12:00:00.000Z',
      },
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
      expect(JSON.parse(stored!)).toEqual({
        cart: mockState.cart,
        history: mockState.history,
      })
    })
  })
})
