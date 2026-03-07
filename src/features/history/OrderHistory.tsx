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

export function OrderHistory() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectOrders)

  if (orders.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
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
          onClick={() => dispatch(clearHistory())}
        >
          Clear History
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.map((order) => (
          <Card key={order.id}>
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
    </Box>
  )
}
