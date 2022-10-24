import mitt from 'mitt';
import { Fn } from './types';

const emitter = mitt();

export const useEventBus = () => {
  const on = (eventName: string, fn: Fn) => {
    emitter.on(eventName, fn);
  };

  const off = (eventName: string, fn: Fn) => {
    emitter.off(eventName, fn);
  };
  const emit = (eventName: string, value: any) => {
    emitter.emit(eventName, value);
  };

  const clear = () => {
    emitter.all.clear();
  };

  return { on, off, emit, clear };
};
