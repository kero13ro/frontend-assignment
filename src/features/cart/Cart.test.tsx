import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils'
import { Cart } from './Cart'
import type { RootState } from '../../store'

const stateWithItems: Partial<RootState> = {
  cart: {
    items: [
      {
        menuItem: { id: 'test-1', name: 'Test Burger', price: 9.99, category: 'Fast Food' },
        quantity: 2,
      },
      {
        menuItem: { id: 'test-2', name: 'Test Fries', price: 3.99, category: 'Fast Food' },
        quantity: 1,
      },
    ],
  },
}

describe('Cart', () => {
  it('should show empty message when cart is empty', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('should render cart items with name, price, and quantity', () => {
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })
    expect(screen.getByText('Test Burger')).toBeInTheDocument()
    expect(screen.getByText('$9.99 each')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Test Fries')).toBeInTheDocument()
    expect(screen.getByText('$3.99 each')).toBeInTheDocument()
  })

  it('should display correct total price', () => {
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })
    // 9.99 * 2 + 3.99 * 1 = 23.97
    expect(screen.getByText('Total: $23.97')).toBeInTheDocument()
  })

  it('should increment quantity when clicking increase button', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })

    await user.click(screen.getByRole('button', { name: /increase test burger/i }))
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should decrement quantity when clicking decrease button', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })

    await user.click(screen.getByRole('button', { name: /decrease test burger/i }))
    // Both items now have quantity 1, so check total reflects the change
    expect(screen.getByText('Total: $13.98')).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('should remove item when quantity reaches zero', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })

    // Test Fries has quantity 1, decrement should remove it
    await user.click(screen.getByRole('button', { name: /decrease test fries/i }))
    expect(screen.queryByText('Test Fries')).not.toBeInTheDocument()
  })

  it('should submit order and clear cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Cart />, { preloadedState: stateWithItems })

    await user.click(screen.getByRole('button', { name: /submit order/i }))
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })
})
