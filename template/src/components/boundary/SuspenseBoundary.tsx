import { Suspense, PropsWithChildren, ReactNode } from 'react';
import { SuspenseFallback } from './SuspenseFallback';

export interface SuspenseBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode;
}

export function SuspenseBoundary({
  children,
  fallback,
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback || <SuspenseFallback />}>{children}</Suspense>
  );
}
