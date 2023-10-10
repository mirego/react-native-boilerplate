import { focusManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState } from 'react-native';

export function useSetQueryFocusManager() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (appState) => {
      focusManager.setFocused(appState === 'active');
    });

    return () => subscription.remove();
  }, []);
}
