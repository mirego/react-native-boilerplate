import { useMemo } from 'react';
import { InjectionToken, container } from 'tsyringe';

export function useService<T>(injectionToken: InjectionToken<T>) {
  const service = useMemo(
    () => container.resolve(injectionToken),
    [injectionToken]
  );

  return service;
}
