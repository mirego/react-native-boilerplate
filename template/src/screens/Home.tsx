import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { ActivityIndicator, Button, Flex } from '../components/kit';
import { useToaster, Text } from '~/components/kit';
import { useService } from '~/hooks/use-service';
import Geolocation, {
  GeolocationState,
  GeolocationStatus,
} from '~/services/geolocation';
import { useApplicationConfiguration } from '~/hooks/use-application-configuration';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const geolocation = useService(Geolocation);
  const { i18n } = useTranslation();

  const apiUrl = useApplicationConfiguration('API_URL');
  const secretPanelEnabled = useApplicationConfiguration(
    'SECRET_PANEL_ENABLED'
  );

  const [currentLocation, setCurrentLocation] = useState<GeolocationState>({
    status: GeolocationStatus.Pending,
    position: null,
    error: null,
  });

  useEffect(() => {
    async function getCurrentPosition() {
      const position = await geolocation.getCurrentPosition();

      setCurrentLocation(position);
    }

    getCurrentPosition();
  }, [geolocation]);

  const { t } = useTranslation();
  const toaster = useToaster();

  const addToast = useCallback(() => {
    toaster.add({ title: 'derp', details: 'Herp derp', type: 'success' });
  }, [toaster]);

  const toggleLanguages = useCallback(() => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  }, [i18n]);

  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex grow gap={10} padding={20} fill justify="center" align="center">
        <Text testID="test-label">{t('test')}</Text>

        <Text>API URL: {apiUrl}</Text>

        {currentLocation.status === GeolocationStatus.Pending ? (
          <ActivityIndicator size={50} />
        ) : (
          <>
            <Text testID="current-position">
              Latitude:{currentLocation.position?.coords.latitude}
              {'\n'}
              Longitude:
              {currentLocation.position?.coords.longitude}
            </Text>
          </>
        )}

        <Button onPress={() => navigation.navigate('ExampleBottomSheet')}>
          Bottom Sheet
        </Button>

        <Button onPress={addToast}>Toast</Button>
        <Button
          onPress={() => {
            setError(Error('test'));
          }}
        >
          Error
        </Button>

        {secretPanelEnabled && (
          <Button onPress={() => navigation.navigate('SecretConfig')}>
            Secret Config
          </Button>
        )}

        <Button onPress={() => toggleLanguages()}>Toggle languages</Button>
      </Flex>
    </SafeAreaView>
  );
}
