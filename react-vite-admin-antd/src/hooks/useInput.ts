import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

type Handler = (e: any) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialState: T): ReturnTypes<T> => {
  const [state, setState] = useState(initialState);
  const handler = useCallback((e: React.ChangeEvent<any>) => {
    setState(e.target.value);
  }, []);

  return [state, handler, setState];
};

export default useInput;
