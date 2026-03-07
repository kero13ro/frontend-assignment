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
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../cart/cartSlice'
import type { MenuItem } from '../../types'

export function Menu() {
  const dispatch = useAppDispatch()

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart(item))
  }

  return (
    <Box>
      {categories.map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
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
