import { ComponentType, ReactNode } from 'react';
import { Boundary } from './Boundary';
import { FallbackRender } from './ErrorBoundary';

export interface WithBoundaryParams {
  suspenseFallback?: ReactNode;
  renderErrorFallback?: FallbackRender;
}
export function withBoundary<Props extends {}>(
  Component: ComponentType<Props>,
  { suspenseFallback, renderErrorFallback }: WithBoundaryParams = {}
) {
  function WithBoundary(props: Props) {
    return (
      <Boundary
        suspenseFallback={suspenseFallback}
        renderErrorFallback={renderErrorFallback}
      >
        <Component {...props} />
      </Boundary>
    );
  }

  return WithBoundary;
}
