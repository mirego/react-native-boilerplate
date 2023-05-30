import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
// import { withBoundary } from '@millie/components/boundary';
// import SplashScreen from 'react-native-splash-screen';
import { useColorScheme } from 'react-native';
import RootNavigator from './RootNavigator';
import { withBoundary } from '~/components/boundary';

function Navigation() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

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
// export default withBoundary(Navigation);
