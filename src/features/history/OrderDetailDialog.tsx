import {
  Box,
  Button,
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
import type { Order } from '../../types'

interface OrderDetailDialogProps {
  order: Order | null
  onClose: () => void
}

export function OrderDetailDialog({ order, onClose }: OrderDetailDialogProps) {
  return (
    <Dialog open={order !== null} onClose={onClose} maxWidth="sm" fullWidth>
      {order && (
        <>
          <DialogTitle>
            Order — {new Date(order.submittedAt).toLocaleString()}
          </DialogTitle>
          <DialogContent>
            <List disablePadding>
              {order.items.map((item) => (
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
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
