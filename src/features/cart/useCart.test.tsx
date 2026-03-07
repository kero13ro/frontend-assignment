import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createTestStore } from '../../test/testUtils'
import { useCart } from './useCart'

function createWrapper() {
  const store = createTestStore()
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
}

describe('useCart', () => {
  it('should return null when submitting an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() })

    let order: unknown
    act(() => {
      order = result.current.submitOrder()
    })

    expect(order).toBeNull()
  })
})
