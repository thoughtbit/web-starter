import type { Ref, ComputedRef } from '@mpxjs/core';

export type Fn = () => void;

export type MaybeRef<T> = T | Ref<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type Stoppable = {
  /**
   * A ref indicate whether a stoppable instance is executing
   */
  isPending: Ref<boolean>;

  /**
   * Stop the effect from executing
   */
  stop: Fn;

  /**
   * Start the effects
   */
  start: Fn;
};

/**
 * @deprecated Use `Stoppable`
 */
export type Stopable = Stoppable;

export type Pausable = {
  /**
   * A ref indicate whether a pausable instance is active
   */
  isActive: Ref<boolean>;

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn;

  /**
   * Resume the effects
   */
  resume: Fn;
};
