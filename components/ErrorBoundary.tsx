
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }
  
  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // Render a custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-900 p-4">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
            <p className="text-gray-300 mb-6">We've encountered an unexpected error. Please try reloading the page.</p>
            <pre className="text-left bg-gray-800 p-4 rounded-lg overflow-x-auto max-w-2xl text-red-300 text-sm mb-6">
                {this.state.error?.toString()}
            </pre>
            <button
                onClick={this.handleReload}
                className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
            >
                Reload Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;