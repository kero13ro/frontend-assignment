import { describe, it, expect } from 'vitest'
import cartReducer, {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from './cartSlice'
import type { MenuItem } from '../../types'

const mockItem: MenuItem = {
  id: 'test-1',
  name: 'Test Burger',
  price: 9.99,
  category: 'Fast Food',
}

const mockItem2: MenuItem = {
  id: 'test-2',
  name: 'Test Fries',
  price: 3.99,
  category: 'Fast Food',
}

describe('cartSlice', () => {
  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] })
  })

  it('should add a new item to cart', () => {
    const state = cartReducer(undefined, addToCart(mockItem))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].menuItem).toEqual(mockItem)
    expect(state.items[0].quantity).toBe(1)
  })

  it('should increment quantity when adding an existing item', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, addToCart(mockItem))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  it('should increment item quantity', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, incrementQuantity(mockItem.id))
    expect(state.items[0].quantity).toBe(2)
  })

  it('should decrement item quantity', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, incrementQuantity(mockItem.id))
    state = cartReducer(state, decrementQuantity(mockItem.id))
    expect(state.items[0].quantity).toBe(1)
  })

  it('should remove item when quantity reaches zero', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, decrementQuantity(mockItem.id))
    expect(state.items).toHaveLength(0)
  })

  it('should remove item regardless of quantity', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, incrementQuantity(mockItem.id))
    state = cartReducer(state, incrementQuantity(mockItem.id))
    // quantity is 3
    state = cartReducer(state, removeFromCart(mockItem.id))
    expect(state.items).toHaveLength(0)
  })

  it('should not change state when removing non-existent item', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, removeFromCart('non-existent'))
    expect(state.items).toHaveLength(1)
  })

  it('should clear all items', () => {
    let state = cartReducer(undefined, addToCart(mockItem))
    state = cartReducer(state, addToCart(mockItem2))
    state = cartReducer(state, clearCart())
    expect(state.items).toHaveLength(0)
  })
})
