import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useNotification } from './useNotification'

describe('useNotification', () => {
  it('should throw when used outside NotificationProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useNotification())).toThrow(
      'useNotification must be used within NotificationProvider'
    )

    vi.restoreAllMocks()
  })
})
