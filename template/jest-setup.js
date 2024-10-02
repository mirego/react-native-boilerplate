import 'reflect-metadata';
import '@testing-library/react-native/extend-expect';
import { jest } from '@jest/globals';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('react-native-device-info', () => mockDeviceInfo);

require('react-native-reanimated/lib/module/reanimated2/jestUtils').setUpTests();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        language: 'en',
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest')
);

jest.mock('@react-native-community/geolocation', () => {
  return {
    addListener: jest.fn(),
    getCurrentPosition: jest.fn(),
    removeListeners: jest.fn(),
    requestAuthorization: jest.fn(),
    setConfiguration: jest.fn(),
    startObserving: jest.fn(),
    stopObserving: jest.fn(),
  };
});

jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: () => ({
    setDefaults: jest.fn(() => Promise.resolve()),
    onConfigUpdated: jest.fn(),
    fetchAndActivate: jest.fn(() => Promise.resolve()),
    setConfigSettings: jest.fn(() => Promise.resolve()),
    getValue: jest.fn(() => ({
      asBoolean: jest.fn(),
      asNumber: jest.fn(),
      asString: jest.fn(),
    })),
  }),
}));
