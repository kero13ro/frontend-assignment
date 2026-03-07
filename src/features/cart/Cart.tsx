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
import { useCart } from './useCart'
import { useNotification } from '../../components/NotificationProvider'

export function Cart() {
  const { items, total, increment, decrement, submitOrder } = useCart()
  const { showNotification } = useNotification()

  const handleSubmitOrder = () => {
    const order = submitOrder()
    if (order) {
      showNotification('Order submitted successfully!', 'success')
    }
  }

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }} role="status">
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
                  onClick={() => decrement(item.menuItem.id)}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  aria-label={`Increase ${item.menuItem.name}`}
                  onClick={() => increment(item.menuItem.id)}
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
        <Typography variant="h6" aria-live="polite">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" size="large" onClick={handleSubmitOrder}>
          Submit Order
        </Button>
      </Box>
    </Box>
  )
}
