import type { MenuItem } from '../types'

export const menuItems: MenuItem[] = [
  // Fast Food
  { id: 'ff-1', name: 'Classic Burger', price: 8.99, category: 'Fast Food' },
  { id: 'ff-2', name: 'Chicken Nuggets', price: 6.49, category: 'Fast Food' },
  { id: 'ff-3', name: 'French Fries', price: 3.99, category: 'Fast Food' },

  // Asian
  { id: 'as-1', name: 'Fried Rice', price: 10.99, category: 'Asian' },
  { id: 'as-2', name: 'Ramen', price: 12.99, category: 'Asian' },
  { id: 'as-3', name: 'Spring Rolls', price: 5.99, category: 'Asian' },

  // Beverages
  { id: 'bv-1', name: 'Iced Coffee', price: 4.49, category: 'Beverages' },
  { id: 'bv-2', name: 'Fresh Orange Juice', price: 3.99, category: 'Beverages' },
  { id: 'bv-3', name: 'Green Tea', price: 2.99, category: 'Beverages' },
]

export const categories = [...new Set(menuItems.map((item) => item.category))]
