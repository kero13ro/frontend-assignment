import { lazy, Suspense } from 'react'
import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router'
import { Typography, CircularProgress, Box } from '@mui/material'
import { RootLayout } from './components/RootLayout'

const Menu = lazy(() =>
  import('./features/menu/Menu').then((m) => ({ default: m.Menu }))
)
const Cart = lazy(() =>
  import('./features/cart/Cart').then((m) => ({ default: m.Cart }))
)
const OrderHistory = lazy(() =>
  import('./features/history/OrderHistory').then((m) => ({
    default: m.OrderHistory,
  }))
)

const lazyFallback = (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
    <CircularProgress />
  </Box>
)

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) =>
  function SuspenseWrapper() {
    return <Suspense fallback={lazyFallback}>{<Component />}</Suspense>
  }

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <Typography>Page not found</Typography>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: withSuspense(Menu),
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: withSuspense(Cart),
})

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: withSuspense(OrderHistory),
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  cartRoute,
  historyRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
