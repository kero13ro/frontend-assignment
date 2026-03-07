import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../test/testUtils'

describe('RootLayout', () => {
  it('should render the dark mode toggle button', async () => {
    renderWithRouter()
    expect(await screen.findByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument()
  })

  it('should toggle theme when clicking the theme button', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    const toggleButton = await screen.findByRole('button', { name: /toggle dark mode/i })
    await user.click(toggleButton)
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument()
  })

  it('should navigate between tabs', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    await user.click(await screen.findByRole('tab', { name: /cart/i }))
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('tab', { name: /history/i }))
    await waitFor(() => {
      expect(screen.getByText(/no order/i)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('tab', { name: /menu/i }))
    await waitFor(() => {
      expect(screen.getByText(/fast food/i)).toBeInTheDocument()
    })
  })
})
