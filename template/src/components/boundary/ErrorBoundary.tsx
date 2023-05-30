import { QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';
import { ErrorView } from './ErrorView';

export type FallbackRender = (props: FallbackProps) => JSX.Element;

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallbackRender?: FallbackRender;
}

export const defaultFallbackRender: FallbackRender = ({
  resetErrorBoundary,
}) => <ErrorView retry={resetErrorBoundary} />;

export function ErrorBoundary({
  fallbackRender = defaultFallbackRender,
  children,
}: ErrorBoundaryProps) {
  const queryClient = useQueryClient();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={() => {
            queryClient.clear();
            reset();
          }}
          fallbackRender={fallbackRender}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
