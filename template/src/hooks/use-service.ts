import { InjectionToken, container } from 'tsyringe';

export function useService<T>(injectionToken: InjectionToken<T>) {
  return container.resolve(injectionToken);
}
