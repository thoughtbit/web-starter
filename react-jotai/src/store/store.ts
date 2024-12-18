import { ComponentProps } from 'react';
import { atom, Provider, useAtom, useAtomValue } from 'jotai';

export type JotaiProviderProps = ComponentProps<typeof Provider>;

export const JotaiProvider = Provider;

export { atom, useAtom, useAtomValue }