import type { MenuItem, CartItem, Order } from '../types'

let counter = 0

export function createMockMenuItem(overrides?: Partial<MenuItem>): MenuItem {
  counter += 1
  return {
    id: `item-${counter}`,
    name: `Test Item ${counter}`,
    price: 9.99,
    category: 'Fast Food',
    ...overrides,
  }
}

export function createMockCartItem(overrides?: Partial<CartItem>): CartItem {
  return {
    menuItem: createMockMenuItem(overrides?.menuItem),
    quantity: 1,
    ...overrides,
  }
}

export function createMockOrder(overrides?: Partial<Order>): Order {
  counter += 1
  return {
    id: `order-${counter}`,
    items: overrides?.items ?? [createMockCartItem()],
    totalAmount: 9.99,
    submittedAt: '2026-03-07T12:00:00.000Z',
    ...overrides,
  }
}
