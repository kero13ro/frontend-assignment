import { createContext, useContext } from 'react'

type ThemeMode = 'light' | 'dark'

export interface ThemeModeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

export function useThemeMode() {
  const context = useContext(ThemeModeContext)
  if (!context) throw new Error('useThemeMode must be used within AppThemeProvider')
  return context
}
