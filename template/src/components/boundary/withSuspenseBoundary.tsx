import { ComponentType, ReactNode } from 'react';
import { SuspenseBoundary } from './SuspenseBoundary';

export function withSuspenseBoundary<Props extends {}>(
  Component: ComponentType<Props>,
  fallback?: ReactNode
) {
  function WithSuspenseBoundary(props: Props) {
    return (
      <SuspenseBoundary fallback={fallback}>
        <Component {...props} />
      </SuspenseBoundary>
    );
  }

  return WithSuspenseBoundary;
}
