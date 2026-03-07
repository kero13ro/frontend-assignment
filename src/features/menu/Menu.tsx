import { memo, useCallback } from 'react'
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
import { useNotification } from '../../components/useNotification'
import type { MenuItem } from '../../types'

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

const MenuItemCard = memo(function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card sx={{ width: 220 }}>
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
          onClick={() => onAddToCart(item)}
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
})

export function Menu() {
  const { addItem } = useCart()
  const { showNotification } = useNotification()

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addItem(item)
      showNotification(`Added ${item.name} to cart`, 'success')
    },
    [addItem, showNotification]
  )

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
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
