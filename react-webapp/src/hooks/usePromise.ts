import { useCallback } from "react";
import useMountedState from "./useMountedState";

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

const usePromise: UsePromise = () => {
  const isMounted = useMountedState();
  return useCallback(
    (promise: Promise<any>) =>
      new Promise<any>((resolve, reject) => {
        const onValue = (value: any) => {
          isMounted() && resolve(value);
        };
        const onError = (error: any) => {
          isMounted() && reject(error);
        };
        promise.then(onValue, onError);
      }),
    []
  );
};

export default usePromise;

/*
const Demo = ({promise}) => {
  const mounted = usePromise();
  const [value, setValue] = useState();

  useEffect(() => {
    (async () => {
      const value = await mounted(promise);
      // This line will not execute if <Demo> component gets unmounted.
      setValue(value);
    })();
  });
};
*/