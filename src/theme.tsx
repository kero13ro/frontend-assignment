import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { ThemeModeContext } from './useThemeMode'

type ThemeMode = 'light' | 'dark'

function loadThemeMode(): ThemeMode {
  try {
    const stored = localStorage.getItem('theme-mode')
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* ignore */ }
  return 'light'
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(loadThemeMode)

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      try { localStorage.setItem('theme-mode', next) } catch { /* ignore */ }
      return next
    })
  }

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
