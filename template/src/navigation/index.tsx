import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { AppState } from 'react-native';
import { focusManager, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import RootNavigator from './RootNavigator';
import { withBoundary } from '~/components/boundary';
import { useColorSchemeValue } from '~/hooks/use-color-scheme-value';
import { useKillswitch } from '~/hooks/use-killswitch';

function Navigation() {
  const theme = useColorSchemeValue([DefaultTheme, DarkTheme]);

  useKillswitch();

  useEffect(() => {
    // Refetch queries on app focus
    const subscription = AppState.addEventListener('change', (appState) => {
      focusManager.setFocused(appState === 'active');
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Refetch queries on reconnect
    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(!!state.isConnected);
    });
  }, []);

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
