/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { errorText } from '../global/constants';

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
      return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
          <h1>{errorText}</h1>;
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
