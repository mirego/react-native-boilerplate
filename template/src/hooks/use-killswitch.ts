import { useTranslation } from 'react-i18next';
import { useKillswitch as useKillswitchLib } from 'react-native-killswitch';
import {
  KILLSWITCH_API_KEY_ANDROID,
  KILLSWITCH_API_KEY_IOS,
  KILLSWITCH_API_URL,
} from '@env';
import DeviceInfo from 'react-native-device-info';

export function useKillswitch() {
  const { i18n } = useTranslation();

  return useKillswitchLib({
    iosApiKey: KILLSWITCH_API_KEY_IOS,
    androidApiKey: KILLSWITCH_API_KEY_ANDROID,
    apiHost: KILLSWITCH_API_URL,
    language: i18n.language,
    version: DeviceInfo.getVersion(),
  });
}
