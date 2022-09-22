import { useCallback, useEffect, useState } from "react";

const useError = (): ((err: Error) => void) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: Error) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;

/*
const Demo = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Some error!'));
  };

  return <button onClick={clickHandler}>Click me to throw</button>;
};

// In parent app
const App = () => (
  <ErrorBoundary>
    <Demo />
  </ErrorBoundary>
);
*/