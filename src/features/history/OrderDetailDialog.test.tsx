import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderDetailDialog } from './OrderDetailDialog'
import { createMockOrder, createMockCartItem } from '../../test/factories'

const mockOrder = createMockOrder({
  items: [
    createMockCartItem({
      menuItem: { id: 'a', name: 'Burger', price: 9.99, category: 'Fast Food' },
      quantity: 2,
    }),
    createMockCartItem({
      menuItem: { id: 'b', name: 'Fries', price: 3.99, category: 'Fast Food' },
      quantity: 1,
    }),
  ],
  totalAmount: 23.97,
  submittedAt: '2026-03-07T12:00:00.000Z',
})

describe('OrderDetailDialog', () => {
  it('should not render content when order is null', () => {
    render(<OrderDetailDialog order={null} onClose={vi.fn()} />)
    expect(screen.queryByText('Total')).not.toBeInTheDocument()
  })

  it('should display order date in title', () => {
    render(<OrderDetailDialog order={mockOrder} onClose={vi.fn()} />)
    expect(screen.getByText(/Order —/)).toBeInTheDocument()
  })

  it('should display all items with name, price, quantity, and line total', () => {
    render(<OrderDetailDialog order={mockOrder} onClose={vi.fn()} />)
    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.getByText('$9.99 x 2')).toBeInTheDocument()
    expect(screen.getByText('$19.98')).toBeInTheDocument()
    expect(screen.getByText('Fries')).toBeInTheDocument()
    expect(screen.getByText('$3.99 x 1')).toBeInTheDocument()
    expect(screen.getByText('$3.99')).toBeInTheDocument()
  })

  it('should display the total amount', () => {
    render(<OrderDetailDialog order={mockOrder} onClose={vi.fn()} />)
    expect(screen.getByText('$23.97')).toBeInTheDocument()
  })

  it('should call onClose when clicking Close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<OrderDetailDialog order={mockOrder} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
