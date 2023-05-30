import { ComponentType } from 'react';
import { ErrorBoundary, FallbackRender } from './ErrorBoundary';

export function withErrorBoundary<Props extends {}>(
  Component: ComponentType<Props>,
  fallbackRender?: FallbackRender
) {
  function WithErrorBoundary(props: Props) {
    return (
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Component {...props} />
      </ErrorBoundary>
    );
  }

  return WithErrorBoundary;
}
