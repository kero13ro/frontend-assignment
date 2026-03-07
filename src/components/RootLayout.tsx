import { Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import { RestaurantMenu, ShoppingCart, History, DarkMode, LightMode } from '@mui/icons-material'
import { NotificationProvider } from './NotificationProvider'
import { ErrorBoundary } from './ErrorBoundary'
import { useAppSelector } from '../store/hooks'
import { selectCartItemCount } from '../features/cart/cartSlice'
import { useThemeMode } from '../useThemeMode'

const tabToPath = ['/', '/cart', '/history'] as const
const pathToTab = Object.fromEntries(
  tabToPath.map((path, index) => [path, index]),
) as Record<string, number>

export function RootLayout() {
  const cartItemCount = useAppSelector(selectCartItemCount)
  const { mode, toggleTheme } = useThemeMode()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentTab = pathToTab[pathname] ?? 0

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate({ to: tabToPath[newValue] })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Food Order System
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle dark mode">
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
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
      <NotificationProvider>
        <ErrorBoundary>
          <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3 }, flex: 1 }}>
            <Outlet />
          </Container>
        </ErrorBoundary>
      </NotificationProvider>
    </Box>
  )
}
