export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  totalAmount: number
  submittedAt: string
}
