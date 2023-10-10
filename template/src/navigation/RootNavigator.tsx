import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { HomeScreen } from '../screens/Home';
import { ExampleBottomSheet } from '~/screens/bottom-sheets/ExampleBottomSheet';
import { SecretConfigScreen } from '~/screens/SecretConfig';
import { useApplicationConfiguration } from '~/hooks/use-application-configuration';

export type RootStackParamList = {
  Home: undefined;
  ExampleBottomSheet: undefined;
  SecretConfig: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { i18n } = useTranslation();
  const languageRef = useRef(i18n.language);
  const queryClient = useQueryClient();

  const secretPanelEnabled = useApplicationConfiguration(
    'SECRET_PANEL_ENABLED'
  );

  useEffect(() => {
    if (i18n.language === languageRef.current) {
      return;
    }

    // Evict everything from the cache but don't refetch anything. Queries will
    // be refetched when they become "enabled" when their screen gains focus.
    queryClient.invalidateQueries({
      refetchType: 'none',
    });
  }, [queryClient, i18n.language]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'none',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ExampleBottomSheet"
          component={ExampleBottomSheet}
        />
      </Stack.Group>

      {secretPanelEnabled && (
        <Stack.Group
          screenOptions={{
            presentation: 'fullScreenModal',
            headerShown: true,
          }}
        >
          <Stack.Screen name="SecretConfig" component={SecretConfigScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export const useRootNavigation = () => useNavigation<RootNavigationProp>();

export default RootNavigator;
