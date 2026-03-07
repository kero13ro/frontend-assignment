import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router'
import { Typography } from '@mui/material'
import { Menu } from './features/menu/Menu'
import { Cart } from './features/cart/Cart'
import { OrderHistory } from './features/history/OrderHistory'
import { RootLayout } from './components/RootLayout'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <Typography>Page not found</Typography>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Menu,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
})

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: OrderHistory,
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
