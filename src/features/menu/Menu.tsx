import { memo, useCallback, useMemo } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  Box,
} from '@mui/material'
import { Add, Check } from '@mui/icons-material'
import { menuItems, categories } from '../../data/menuItems'
import { useCart } from '../cart/useCart'
import { useNotification } from '../../components/useNotification'
import type { MenuItem } from '../../types'

interface MenuItemCardProps {
  item: MenuItem
  inCart: boolean
  onAddToCart: (item: MenuItem) => void
}

const MenuItemCard = memo(function MenuItemCard({ item, inCart, onAddToCart }: MenuItemCardProps) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        {inCart ? (
          <Chip icon={<Check />} label="In Cart" color="success" size="small" />
        ) : (
          <Button
            size="small"
            startIcon={<Add />}
            onClick={() => onAddToCart(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  )
})

export function Menu() {
  const { items, addItem } = useCart()
  const { showNotification } = useNotification()

  const cartItemIds = useMemo(() => new Set(items.map((ci) => ci.menuItem.id)), [items])

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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  inCart={cartItemIds.has(item.id)}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
