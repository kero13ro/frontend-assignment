import { useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import { RestaurantMenu, ShoppingCart, History } from '@mui/icons-material'
import { Menu } from './features/menu/Menu'
import { Cart } from './features/cart/Cart'
import { OrderHistory } from './features/history/OrderHistory'
import { useAppSelector } from './store/hooks'
import { selectCartItemCount } from './features/cart/cartSlice'

export function App() {
  const [tab, setTab] = useState(0)
  const cartItemCount = useAppSelector(selectCartItemCount)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Food Order System
          </Typography>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(_, newValue: number) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          centered
        >
          <Tab icon={<RestaurantMenu />} label="Menu" />
          <Tab
            icon={
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCart />
              </Badge>
            }
            label="Cart"
          />
          <Tab icon={<History />} label="History" />
        </Tabs>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 3, flex: 1 }}>
        {tab === 0 && <Menu />}
        {tab === 1 && <Cart />}
        {tab === 2 && <OrderHistory />}
      </Container>
    </Box>
  )
}
