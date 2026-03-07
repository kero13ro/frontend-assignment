import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectOrders, clearHistory } from './historySlice'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { OrderDetailDialog } from './OrderDetailDialog'
import type { Order } from '../../types'

function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleString()
}

export function OrderHistory() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectOrders)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleClearHistory = () => {
    dispatch(clearHistory())
    setConfirmOpen(false)
  }

  if (orders.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }} role="status">
        No order history yet. Submit an order to see it here!
      </Typography>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5">Order History</Typography>
        <Button
          color="error"
          startIcon={<Delete />}
          onClick={() => setConfirmOpen(true)}
          aria-label="Clear all order history"
        >
          Clear History
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedOrder(order)}
            role="button"
            aria-label={`View order details from ${formatOrderDate(order.submittedAt)}`}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {formatOrderDate(order.submittedAt)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {order.items
                  .map(
                    (item) => `${item.menuItem.name} x${item.quantity}`
                  )
                  .join(', ')}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Total: ${order.totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <ConfirmDialog
        open={confirmOpen}
        title="Clear Order History"
        message="Are you sure you want to clear all order history? This action cannot be undone."
        onConfirm={handleClearHistory}
        onCancel={() => setConfirmOpen(false)}
      />
      <OrderDetailDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Box>
  )
}
