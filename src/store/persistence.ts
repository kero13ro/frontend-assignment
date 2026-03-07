import type { RootState } from '.'

const STORAGE_KEY = 'foodOrderState'

export function loadState(): Partial<RootState> | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

export function saveState(state: RootState): void {
  try {
    const serialized = JSON.stringify({
      cart: state.cart,
      history: state.history,
    })
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch {
    // Silently fail on storage errors (quota exceeded, etc.)
  }
}
