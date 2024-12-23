import { useState } from 'react';
import isUndefined from 'lodash/isUndefined';

export default function useValidation<
  T extends HTMLInputElement | HTMLTextAreaElement,
>(handleValidation?: (value: string) => void) {
  const [isDirty, setIsDirty] = useState(false);

  if (isUndefined(handleValidation) || typeof handleValidation !== 'function') {
    return {
      onBlur: () => {},
      onChange: () => {},
    };
  }

  const onBlur = (e: React.FocusEvent<T>) => {
    setIsDirty(true);
    handleValidation?.(e.target.value);
  };

  const onChange = (e: React.ChangeEvent<T>) => {
    if (isDirty) {
      handleValidation?.(e.target.value);
    }
  };

  return {
    onBlur,
    onChange,
  };
}

/*
    // Validation
    const validation = useValidation<HTMLInputElement>(handleValidation);

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = e => {
      if (onBlur) {
        onBlur(e);
      }

      validation.onBlur(e);
    };

    const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }

      validation.onChange(e);
    };

    <input  onChange={onValueChange} onBlur={onBlurHandler} />
*/