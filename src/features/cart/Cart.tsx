import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectCartItems,
  selectCartTotal,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from './cartSlice'
import { addOrder } from '../history/historySlice'
import { useNotification } from '../../components/NotificationProvider'
import type { Order } from '../../types'

export function Cart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const { showNotification } = useNotification()

  const handleSubmitOrder = () => {
    if (items.length === 0) return

    const order: Order = {
      id: crypto.randomUUID(),
      items: items.map((item) => ({ ...item })),
      totalAmount: total,
      submittedAt: new Date().toISOString(),
    }

    dispatch(addOrder(order))
    dispatch(clearCart())
    showNotification('Order submitted successfully!', 'success')
  }

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
        Your cart is empty. Add some items from the menu!
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Cart
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.menuItem.id}
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  aria-label={`Decrease ${item.menuItem.name}`}
                  onClick={() => dispatch(decrementQuantity(item.menuItem.id))}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  aria-label={`Increase ${item.menuItem.name}`}
                  onClick={() => dispatch(incrementQuantity(item.menuItem.id))}
                  size="small"
                >
                  <Add />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={item.menuItem.name}
              secondary={`$${item.menuItem.price.toFixed(2)} each`}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" size="large" onClick={handleSubmitOrder}>
          Submit Order
        </Button>
      </Box>
    </Box>
  )
}
