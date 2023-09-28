import { useTranslation } from 'react-i18next';
import { useKillswitch as useKillswitchLib } from 'react-native-killswitch';
import DeviceInfo from 'react-native-device-info';
import { useApplicationConfiguration } from '~/hooks/use-application-configuration';

export function useKillswitch() {
  const { i18n } = useTranslation();

  const apiHost = useApplicationConfiguration('KILLSWITCH_API_URL');
  const iosApiKey = useApplicationConfiguration('KILLSWITCH_API_KEY_IOS');
  const androidApiKey = useApplicationConfiguration(
    'KILLSWITCH_API_KEY_ANDROID'
  );

  return useKillswitchLib({
    apiHost,
    iosApiKey,
    androidApiKey,
    language: i18n.language,
    version: DeviceInfo.getVersion(),
  });
}
