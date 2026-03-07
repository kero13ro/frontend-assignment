import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './test/testUtils'
import { App } from './App'
import type { RootState } from './store'

describe('App', () => {
  it('should render the app title', () => {
    renderWithProviders(<App />)
    expect(screen.getByText('Food Order System')).toBeInTheDocument()
  })

  it('should render three tabs', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('tab', { name: /menu/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /cart/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /history/i })).toBeInTheDocument()
  })

  it('should show Menu content by default', () => {
    renderWithProviders(<App />)
    expect(screen.getByText('Fast Food')).toBeInTheDocument()
  })

  it('should switch to Cart tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(screen.getByRole('tab', { name: /cart/i }))
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('should switch to History tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(screen.getByRole('tab', { name: /history/i }))
    expect(screen.getByText(/no order history yet/i)).toBeInTheDocument()
  })

  it('should display cart badge with item count', () => {
    const stateWithCart: Partial<RootState> = {
      cart: {
        items: [
          { menuItem: { id: 't-1', name: 'Burger', price: 9.99, category: 'Fast Food' }, quantity: 3 },
        ],
      },
    }
    renderWithProviders(<App />, { preloadedState: stateWithCart })
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
