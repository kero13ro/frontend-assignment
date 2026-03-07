import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { menuItems, categories } from '../../data/menuItems'
import { useCart } from '../cart/useCart'
import { useNotification } from '../../components/NotificationProvider'
import type { MenuItem } from '../../types'

export function Menu() {
  const { addItem } = useCart()
  const { showNotification } = useNotification()

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
    showNotification(`Added ${item.name} to cart`, 'success')
  }

  return (
    <Box>
      {categories.map((category) => (
        <Box key={category} sx={{ mb: 4 }} role="region" aria-label={`${category} category`}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {category}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <Card key={item.id} sx={{ width: 220 }}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<Add />}
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
