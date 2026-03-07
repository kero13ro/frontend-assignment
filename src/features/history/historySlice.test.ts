import { describe, it, expect } from 'vitest'
import historyReducer, { addOrder, clearHistory } from './historySlice'
import type { Order } from '../../types'

const mockOrder: Order = {
  id: 'order-1',
  items: [
    { menuItem: { id: 'item-1', name: 'Test Burger', price: 9.99, category: 'Fast Food' }, quantity: 2 },
    { menuItem: { id: 'item-2', name: 'Test Fries', price: 3.99, category: 'Fast Food' }, quantity: 1 },
  ],
  totalAmount: 23.97,
  submittedAt: '2026-03-07T12:00:00.000Z',
}

const mockOrder2: Order = {
  id: 'order-2',
  items: [
    { menuItem: { id: 'item-3', name: 'Ramen', price: 12.99, category: 'Asian' }, quantity: 1 },
  ],
  totalAmount: 12.99,
  submittedAt: '2026-03-07T13:00:00.000Z',
}

describe('historySlice', () => {
  it('should return initial state', () => {
    expect(historyReducer(undefined, { type: 'unknown' })).toEqual({ orders: [] })
  })

  it('should add an order', () => {
    const state = historyReducer(undefined, addOrder(mockOrder))
    expect(state.orders).toHaveLength(1)
    expect(state.orders[0]).toEqual(mockOrder)
  })

  it('should prepend new orders (newest first)', () => {
    let state = historyReducer(undefined, addOrder(mockOrder))
    state = historyReducer(state, addOrder(mockOrder2))
    expect(state.orders).toHaveLength(2)
    expect(state.orders[0].id).toBe('order-2')
    expect(state.orders[1].id).toBe('order-1')
  })

  it('should clear all orders', () => {
    let state = historyReducer(undefined, addOrder(mockOrder))
    state = historyReducer(state, addOrder(mockOrder2))
    state = historyReducer(state, clearHistory())
    expect(state.orders).toHaveLength(0)
  })

  it('should handle clearing empty history', () => {
    const state = historyReducer(undefined, clearHistory())
    expect(state.orders).toHaveLength(0)
  })
})
