import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from './test/testUtils'
import type { RootState } from './store'

describe('App', () => {
  it('should render the app title', async () => {
    renderWithRouter()
    expect(await screen.findByText('Food Order System')).toBeInTheDocument()
  })

  it('should render three tabs', async () => {
    renderWithRouter()
    expect(await screen.findByRole('tab', { name: /menu/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /cart/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /history/i })).toBeInTheDocument()
  })

  it('should show Menu content by default', async () => {
    renderWithRouter()
    expect(await screen.findByText('Fast Food')).toBeInTheDocument()
  })

  it('should switch to Cart tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter()
    await user.click(await screen.findByRole('tab', { name: /cart/i }))
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    })
  })

  it('should switch to History tab when clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter()
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
    renderWithRouter({ preloadedState: stateWithCart })
    expect(await screen.findByText('3')).toBeInTheDocument()
  })
})
