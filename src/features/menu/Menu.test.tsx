import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/testUtils'
import { Menu } from './Menu'

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
    expect(buttons).toHaveLength(9)
  })

  it('should add item to cart when clicking Add to Cart', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Menu />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(buttons[0])

    const state = store.getState()
    expect(state.cart.items).toHaveLength(1)
    expect(state.cart.items[0].menuItem.name).toBe('Classic Burger')
    expect(state.cart.items[0].quantity).toBe(1)
  })

  it('should increment quantity when adding same item twice', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<Menu />)

    const buttons = screen.getAllByRole('button', { name: /add.*to cart/i })
    await user.click(buttons[0])
    await user.click(buttons[0])

    const state = store.getState()
    expect(state.cart.items).toHaveLength(1)
    expect(state.cart.items[0].quantity).toBe(2)
  })
})
