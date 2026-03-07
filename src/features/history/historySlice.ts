import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../../types'

interface HistoryState {
  orders: Order[]
}

const initialState: HistoryState = {
  orders: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload)
    },
    clearHistory(state) {
      state.orders = []
    },
  },
  selectors: {
    selectOrders: (state) => state.orders,
  },
})

export const { addOrder, clearHistory } = historySlice.actions
export const { selectOrders } = historySlice.selectors
export default historySlice.reducer
