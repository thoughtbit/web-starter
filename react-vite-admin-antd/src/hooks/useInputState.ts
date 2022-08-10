import React, { useState } from "react";

export function getInputOnChange<T>(setValue: (value: null | undefined | T | ((current: T) => T)) => void) {
  return (val: null | undefined | T | React.ChangeEvent<any> | ((current: T) => T)) => {
    if (!val) {
      setValue(val as T);
    } else if (typeof val === "function") {
      setValue(val);
    } else if (typeof val === "object" && "nativeEvent" in val) {
      const { currentTarget } = val;

      if (currentTarget.type === "checkbox") {
        setValue((currentTarget as any).checked as any);
      } else {
        setValue(currentTarget.value as any);
      }
    } else {
      setValue(val);
    }
  };
}

export function useInputState<T>(initialState: T) {
  const [value, setValue] = useState(initialState);
  return [value, getInputOnChange<T | any>(setValue)] as [
    T,
    (value: null | undefined | T | React.ChangeEvent<any>) => void
  ];
}

export default useInputState;

/*
import { useState } from 'react';
import { useInputState } from '@/hooks';

function WithUseInputState() {
  const [stringValue, setStringValue] = useInputState('');

  return (
    <>
      <input type="text" value={stringValue} onChange={setStringValue} />
    </>
  );
}

function WithUseState() {
  const [stringValue, setStringValue] = useState('');

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={(event) => setStringValue(event.currentTarget.value)}
      />
    </>
  );
}
*/
