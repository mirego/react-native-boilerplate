import { useTranslation } from 'react-i18next';
import { useKillswitch as useKillswitchLib } from 'react-native-killswitch';
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info';

export function useKillswitch() {
  const { i18n } = useTranslation();

  return useKillswitchLib({
    iosApiKey: Config.KILLSWITCH_API_KEY_IOS!,
    androidApiKey: Config.KILLSWITCH_API_KEY_ANDROID!,
    apiHost: Config.KILLSWITCH_API_URL!,
    language: i18n.language,
    version: DeviceInfo.getVersion(),
  });
}
