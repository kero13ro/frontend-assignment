import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, MenuItem } from '../../types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<MenuItem>) {
      const existing = state.items.find(
        (item) => item.menuItem.id === action.payload.id
      )
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ menuItem: action.payload, quantity: 1 })
      }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (item) => item.menuItem.id === action.payload
      )
      if (item) {
        item.quantity += 1
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.menuItem.id === action.payload
      )
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1
        } else {
          state.items.splice(index, 1)
        }
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
  },
})

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions
export const { selectCartItems } = cartSlice.selectors

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0)
)

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
)

export default cartSlice.reducer
