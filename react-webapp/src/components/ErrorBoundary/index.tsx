import { ErrorBoundary as NativeErrorBoundary } from "react-error-boundary";

type ErrorBoundaryProps = {
  children?: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, ...restProps }) => {
  return (
    <NativeErrorBoundary
      FallbackComponent={({ error }) => {
        return (
          <div className="" role="alert">
            <h2 className="">哎呀，出问题了 :( </h2>

            <pre>
              <code>{error && error.toString()}</code>
            </pre>

            <div>
              <button className="" onClick={() => window.location.assign(window.location.origin)}>
                刷新
              </button>
            </div>
          </div>
        );
      }}
      {...restProps}
    >
      {children}
    </NativeErrorBoundary>
  );
};

export default ErrorBoundary;
