import React from "react";
import { MODE } from "@@/constants";

interface IErrorBoundaryProps {
  readonly children: React.ReactNode;
}

interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  readonly state: IErrorBoundaryState = { error: undefined, errorInfo: undefined };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails = MODE ? (
        <details className="preserve-space">
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      ) : undefined;
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
