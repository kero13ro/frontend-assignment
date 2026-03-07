import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router'
import cartReducer from '../features/cart/cartSlice'
import historyReducer from '../features/history/historySlice'
import { NotificationProvider } from '../components/NotificationProvider'
import { AppThemeProvider } from '../theme'
import { routeTree } from '../router'
import type { RootState } from '../store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
}

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      cart: cartReducer,
      history: historyReducer,
    },
    preloadedState: preloadedState as RootState,
  })
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = createTestStore(preloadedState)

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <NotificationProvider>{children}</NotificationProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

interface RouterRenderOptions {
  preloadedState?: Partial<RootState>
  initialRoute?: string
}

export function renderWithRouter({
  preloadedState,
  initialRoute = '/',
}: RouterRenderOptions = {}) {
  const store = createTestStore(preloadedState)

  const testRouter = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialRoute] }),
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <AppThemeProvider>
          <RouterProvider router={testRouter} />
        </AppThemeProvider>
      </Provider>
    ),
  }
}
