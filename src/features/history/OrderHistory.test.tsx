import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils'
import { OrderHistory } from './OrderHistory'
import type { RootState } from '../../store'

const stateWithOrders: Partial<RootState> = {
  history: {
    orders: [
      {
        id: 'order-2',
        items: [
          { menuItem: { id: 'item-1', name: 'Ramen', price: 12.99, category: 'Asian' }, quantity: 1 },
        ],
        totalAmount: 12.99,
        submittedAt: '2026-03-07T13:00:00.000Z',
      },
      {
        id: 'order-1',
        items: [
          { menuItem: { id: 'item-2', name: 'Classic Burger', price: 8.99, category: 'Fast Food' }, quantity: 2 },
          { menuItem: { id: 'item-3', name: 'French Fries', price: 3.99, category: 'Fast Food' }, quantity: 1 },
        ],
        totalAmount: 21.97,
        submittedAt: '2026-03-07T12:00:00.000Z',
      },
    ],
  },
}

describe('OrderHistory', () => {
  it('should show empty message when no orders exist', () => {
    renderWithProviders(<OrderHistory />)
    expect(screen.getByText(/no order history yet/i)).toBeInTheDocument()
  })

  it('should render order cards with items summary and total', () => {
    renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })
    expect(screen.getByText('Ramen x1')).toBeInTheDocument()
    expect(screen.getByText('Total: $12.99')).toBeInTheDocument()
    expect(screen.getByText('Classic Burger x2, French Fries x1')).toBeInTheDocument()
    expect(screen.getByText('Total: $21.97')).toBeInTheDocument()
  })

  it('should display order submission time', () => {
    renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })
    const timeElements = screen.getAllByText(/2026/)
    expect(timeElements.length).toBeGreaterThanOrEqual(2)
  })

  it('should show Clear History button when orders exist', () => {
    renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })
    expect(screen.getByRole('button', { name: /clear history/i })).toBeInTheDocument()
  })

  it('should show confirmation dialog when clicking Clear History', async () => {
    const user = userEvent.setup()
    renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })

    await user.click(screen.getByRole('button', { name: /clear history/i }))
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument()
  })

  it('should clear all orders after confirming', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })

    await user.click(screen.getByRole('button', { name: /clear history/i }))
    await user.click(screen.getByRole('button', { name: /confirm/i }))
    expect(store.getState().history.orders).toHaveLength(0)
    expect(screen.getByText(/no order history yet/i)).toBeInTheDocument()
  })

  it('should not clear orders when cancelling', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<OrderHistory />, { preloadedState: stateWithOrders })

    await user.click(screen.getByRole('button', { name: /clear history/i }))
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(store.getState().history.orders).toHaveLength(2)
  })
})
