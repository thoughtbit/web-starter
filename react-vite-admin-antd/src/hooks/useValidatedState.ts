import { useState } from "react";

export function useValidatedState<T>(
  initialValue: T,
  validation: (value: T) => boolean,
  initialValidationState?: boolean
) {
  const [value, setValue] = useState<T>(initialValue);
  const [lastValidValue, setLastValidValue] = useState<T | undefined>(
    validation(initialValue) ? initialValue : undefined
  );
  const [valid, setValid] = useState<boolean>(
    typeof initialValidationState === "boolean" ? initialValidationState : validation(initialValue)
  );

  const onChange = (val: T) => {
    if (validation(val)) {
      setLastValidValue(val);
      setValid(true);
    } else {
      setValid(false);
    }

    setValue(val);
  };

  return [{ value, lastValidValue, valid }, onChange] as const;
}

/* 
const [{ lastValidValue, value, valid }, setValue] = useValidatedState(
  'valid',
  (value) => value === 'valid'
);

lastValidValue; // -> valid
value; // -> valid
valid; // -> true

setValue('invalid');

lastValidValue; // -> valid
value; // -> invalid
valid; // -> false
*/

/*
import { useValidatedState } from '@/hooks';

function Demo() {
  const [{ value, lastValidValue, valid }, setEmail] = useValidatedState(
    '',
    (val) => /^\S+@\S+$/.test(val),
    true
  );

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
      <input
        value={value}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required
        error={!valid}
        placeholder="email@example.com"
        label="Your email"
      />

      <div>
        <div>
          Current value:
        </div>{' '}
        {value || '[empty string]'}
      </div>
      <div>
        <div>
          Last valid value:
        </div>{' '}
        {lastValidValue || '[empty string]'}
      </div>
    </div>
  );
}
*/