import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router'
import { routeTree } from './router'
import cartReducer from './features/cart/cartSlice'
import historyReducer from './features/history/historySlice'
import type { RootState } from './store'

function renderApp(preloadedState?: Partial<RootState>, initialRoute = '/') {
  const store = configureStore({
    reducer: { cart: cartReducer, history: historyReducer },
    preloadedState: preloadedState as RootState,
  })

  const testRouter = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialRoute] }),
  })

  return { store, ...render(
    <Provider store={store}>
      <RouterProvider router={testRouter} />
    </Provider>
  ) }
}

describe('App', () => {
  it('should render the app title', async () => {
    renderApp()
    expect(await screen.findByText('Food Order System')).toBeInTheDocument()
  })

  it('should render three tabs', async () => {
    renderApp()
    expect(await screen.findByRole('tab', { name: /menu/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /cart/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /history/i })).toBeInTheDocument()
  })

  it('should show Menu content by default', async () => {
    renderApp()
    expect(await screen.findByText('Fast Food')).toBeInTheDocument()
  })

  it('should switch to Cart tab when clicked', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(await screen.findByRole('tab', { name: /cart/i }))
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    })
  })

  it('should switch to History tab when clicked', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(await screen.findByRole('tab', { name: /history/i }))
    await waitFor(() => {
      expect(screen.getByText(/no order history yet/i)).toBeInTheDocument()
    })
  })

  it('should display cart badge with item count', async () => {
    const stateWithCart: Partial<RootState> = {
      cart: {
        items: [
          { menuItem: { id: 't-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 3 },
        ],
      },
    }
    renderApp(stateWithCart)
    expect(await screen.findByText('3')).toBeInTheDocument()
  })
})
