import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import historyReducer from '../features/history/historySlice'
import type { RootState } from '../store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      history: historyReducer,
    },
    preloadedState: preloadedState as RootState,
  })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
