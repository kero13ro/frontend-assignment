import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotificationProvider } from './NotificationProvider'
import { useNotification } from './useNotification'

function TestConsumer() {
  const { showNotification } = useNotification()
  return (
    <button onClick={() => showNotification('Test message', 'success')}>
      Show
    </button>
  )
}

describe('NotificationProvider', () => {
  it('should show and dismiss notification', async () => {
    const user = userEvent.setup()
    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>
    )

    await user.click(screen.getByRole('button', { name: /show/i }))
    expect(screen.getByText('Test message')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close/i }))
    await waitFor(() => {
      expect(screen.queryByText('Test message')).not.toBeInTheDocument()
    })
  })
})
