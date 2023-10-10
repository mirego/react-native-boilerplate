import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { AppState } from 'react-native';
import { focusManager } from '@tanstack/react-query';
import RootNavigator from './RootNavigator';
import { withBoundary } from '~/components/boundary';
import { useColorSchemeValue } from '~/hooks/use-color-scheme-value';
import { useKillswitch } from '~/hooks/use-killswitch';

// Notify react-query when the focused state changes
AppState.addEventListener('change', (appState) => {
  focusManager.setFocused(appState === 'active');
});

function Navigation() {
  const theme = useColorSchemeValue([DefaultTheme, DarkTheme]);

  useKillswitch();

  return (
    <NavigationContainer
      theme={theme}
      // linking={LinkingConfiguration}
      // onReady={() => SplashScreen.hide()}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
export default withBoundary(Navigation);
