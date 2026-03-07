import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import historyReducer from '../features/history/historySlice'
import { loadState, saveState } from './persistence'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    history: historyReducer,
  },
  preloadedState: loadState() as undefined,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
