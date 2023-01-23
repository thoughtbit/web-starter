import type { Dispatch, SetStateAction } from 'react';

export type StateSetter<T> = Dispatch<SetStateAction<T>>;
