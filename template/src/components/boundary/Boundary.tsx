import { PropsWithChildren, ReactNode } from 'react';
import { ErrorBoundary, FallbackRender } from './ErrorBoundary';
import { SuspenseBoundary } from './SuspenseBoundary';

export interface BoundaryProps extends PropsWithChildren {
  suspenseFallback?: ReactNode;
  renderErrorFallback?: FallbackRender;
}

export function Boundary({
  suspenseFallback,
  renderErrorFallback,
  children,
}: BoundaryProps) {
  return (
    <ErrorBoundary fallbackRender={renderErrorFallback}>
      <SuspenseBoundary fallback={suspenseFallback}>
        {children}
      </SuspenseBoundary>
    </ErrorBoundary>
  );
}
