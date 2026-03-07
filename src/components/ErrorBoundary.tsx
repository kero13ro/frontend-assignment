import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Box, Button, Typography } from '@mui/material'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            An unexpected error occurred. Please try again.
          </Typography>
          <Button
            variant="contained"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
