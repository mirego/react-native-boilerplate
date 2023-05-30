import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/Home';
import { ExampleBottomSheet } from '~/screens/bottom-sheets/ExampleBottomSheet';

export type RootStackParamList = {
  Home: undefined;
  ExampleBottomSheet: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
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
    </Stack.Navigator>
  );
}

export const useRootNavigation = () => useNavigation<RootNavigationProp>();

export default RootNavigator;
