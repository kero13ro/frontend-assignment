import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppThemeProvider } from './theme'
import { useThemeMode } from './useThemeMode'

function ThemeModeConsumer() {
  const { mode, toggleTheme } = useThemeMode()
  return (
    <div>
      <span role="status">{mode}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('AppThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should default to light mode when localStorage is empty', () => {
    render(<AppThemeProvider><ThemeModeConsumer /></AppThemeProvider>)
    expect(screen.getByRole('status')).toHaveTextContent('light')
  })

  it('should load dark mode from localStorage', () => {
    localStorage.setItem('theme-mode', 'dark')
    render(<AppThemeProvider><ThemeModeConsumer /></AppThemeProvider>)
    expect(screen.getByRole('status')).toHaveTextContent('dark')
  })

  it('should load light mode from localStorage', () => {
    localStorage.setItem('theme-mode', 'light')
    render(<AppThemeProvider><ThemeModeConsumer /></AppThemeProvider>)
    expect(screen.getByRole('status')).toHaveTextContent('light')
  })

  it('should fallback to light on invalid localStorage value', () => {
    localStorage.setItem('theme-mode', 'invalid')
    render(<AppThemeProvider><ThemeModeConsumer /></AppThemeProvider>)
    expect(screen.getByRole('status')).toHaveTextContent('light')
  })

  it('should toggle theme and persist to localStorage', async () => {
    const user = userEvent.setup()
    render(<AppThemeProvider><ThemeModeConsumer /></AppThemeProvider>)

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('status')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme-mode')).toBe('dark')

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('status')).toHaveTextContent('light')
    expect(localStorage.getItem('theme-mode')).toBe('light')
  })
})
