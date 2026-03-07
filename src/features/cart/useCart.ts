import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from './cartSlice'
import { addOrder } from '../history/historySlice'
import type { MenuItem, Order } from '../../types'

export function useCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const itemCount = useAppSelector(selectCartItemCount)

  const addItem = useCallback(
    (item: MenuItem) => dispatch(addToCart(item)),
    [dispatch]
  )

  const increment = useCallback(
    (id: string) => dispatch(incrementQuantity(id)),
    [dispatch]
  )

  const decrement = useCallback(
    (id: string) => dispatch(decrementQuantity(id)),
    [dispatch]
  )

  const submitOrder = useCallback(() => {
    if (items.length === 0) return null

    const order: Order = {
      id: crypto.randomUUID(),
      items: items.map((item) => ({ ...item })),
      totalAmount: total,
      submittedAt: new Date().toISOString(),
    }

    dispatch(addOrder(order))
    dispatch(clearCart())
    return order
  }, [dispatch, items, total])

  return { items, total, itemCount, addItem, increment, decrement, submitOrder }
}
