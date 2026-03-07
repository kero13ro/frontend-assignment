import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectOrders, clearHistory } from './historySlice'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import type { Order } from '../../types'

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
            aria-label={`View order details from ${new Date(order.submittedAt).toLocaleString()}`}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(order.submittedAt).toLocaleString()}
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
      <Dialog
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Order — {new Date(selectedOrder.submittedAt).toLocaleString()}
            </DialogTitle>
            <DialogContent>
              <List disablePadding>
                {selectedOrder.items.map((item) => (
                  <ListItem key={item.menuItem.id} disableGutters>
                    <ListItemText
                      primary={item.menuItem.name}
                      secondary={`$${item.menuItem.price.toFixed(2)} x ${item.quantity}`}
                    />
                    <Typography variant="body2">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
