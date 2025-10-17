/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<any>,
  { hasError: boolean }
> {
  constructor(props: React.PropsWithChildren<any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by Error Boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
