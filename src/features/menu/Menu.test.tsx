import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils'
import { createMockCartItem } from '../../test/factories'
import { Menu } from './Menu'
import { menuItems } from '../../data/menuItems'

describe('Menu', () => {
  it('should render all category headings', () => {
    renderWithProviders(<Menu />)
    expect(screen.getByText('Fast Food')).toBeInTheDocument()
    expect(screen.getByText('Asian')).toBeInTheDocument()
    expect(screen.getByText('Beverages')).toBeInTheDocument()
  })

  it('should render food items with name and price', () => {
    renderWithProviders(<Menu />)
    expect(screen.getByText('Classic Burger')).toBeInTheDocument()
    expect(screen.getByText('$8.99')).toBeInTheDocument()
    expect(screen.getByText('Ramen')).toBeInTheDocument()
    expect(screen.getByText('$12.99')).toBeInTheDocument()
    expect(screen.getByText('Iced Coffee')).toBeInTheDocument()
    expect(screen.getByText('$4.49')).toBeInTheDocument()
  })

  it('should render an Add to Cart button for each item', () => {
    renderWithProviders(<Menu />)
    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    expect(buttons).toHaveLength(menuItems.length)
  })

  it('should add item to cart when clicking Add to Cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Menu />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(buttons[0])

    expect(screen.getByText('In Cart')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /add.*to cart/i })).toHaveLength(menuItems.length - 1)
  })

  it('should show In Cart chip after adding item', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Menu />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(buttons[0])

    expect(screen.getByText('In Cart')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /add.*to cart/i })).toHaveLength(menuItems.length - 1)
  })

  it('should show In Cart for items already in cart', () => {
    renderWithProviders(<Menu />, {
      preloadedState: {
        cart: {
          items: [
            createMockCartItem({ menuItem: { id: 'ff-1', name: 'Classic Burger', price: 8.99, category: 'Fast Food' } }),
          ],
        },
      },
    })

    expect(screen.getByText('In Cart')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /add.*to cart/i })).toHaveLength(menuItems.length - 1)
  })
})
