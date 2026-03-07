import { createContext, useContext } from 'react'

export type Severity = 'success' | 'info' | 'warning' | 'error'

export interface NotificationContextValue {
  showNotification: (message: string, severity?: Severity) => void
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
