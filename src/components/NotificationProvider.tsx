import { useCallback, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { NotificationContext, type Severity } from './useNotification'

interface NotificationState {
  open: boolean
  message: string
  severity: Severity
}

const initialState: NotificationState = { open: false, message: '', severity: 'success' }

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>(initialState)

  const showNotification = useCallback((message: string, severity: Severity = 'success') => {
    setNotification({ open: true, message, severity })
  }, [])

  const handleClose = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }))
  }, [])

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}
