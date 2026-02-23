import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

// Wraps the repeated loading/error/empty pattern
interface AsyncBoundaryProps {
  loading: boolean
  error: boolean
  errorMessage?: string
  onRetry?: () => void
  children: React.ReactNode
}

export default function AsyncBoundary({
  loading,
  error,
  errorMessage,
  onRetry,
  children,
}: AsyncBoundaryProps) {
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={errorMessage} onRetry={onRetry} />
  return <>{children}</>
}
