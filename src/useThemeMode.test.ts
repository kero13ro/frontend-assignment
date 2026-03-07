import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useThemeMode } from './useThemeMode'

describe('useThemeMode', () => {
  it('should throw when used outside AppThemeProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useThemeMode())).toThrow(
      'useThemeMode must be used within AppThemeProvider'
    )

    vi.restoreAllMocks()
  })
})
