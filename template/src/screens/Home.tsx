import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { ActivityIndicator, Button, Flex } from '../components/kit';
import { useToaster, Text } from '~/components/kit';
import { useService } from '~/hooks/use-service';
import Geolocation, {
  GeolocationState,
  GeolocationStatus,
} from '~/services/geolocation';
import { useApplicationConfiguration } from '~/hooks/use-application-configuration';
import { useRemoteConfig } from '~/hooks/use-remote-config';
import { useNewFeature } from '~/hooks/use-new-feature';
import { Swiper } from '~/components/kit/swiper';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const geolocation = useService(Geolocation);
  const { i18n } = useTranslation();
  const { width } = useWindowDimensions();

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

  const someFeatureFlag = useRemoteConfig('some_feature_flag');
  const [isFeatureNew, markSeen] = useNewFeature('new_feature_example');

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

        {someFeatureFlag && <Text>Feature flag example</Text>}

        {isFeatureNew && (
          <Flex>
            <Text>This feature is new</Text>
            <Button onPress={() => markSeen()}>OK</Button>
          </Flex>
        )}
      </Flex>

      <Swiper
        containerWidth={width}
        estimatedListSize={{ width, height: 250 }}
        containerHorizontalPadding={24}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        gap={16}
        tileWidth={200}
        snapToAlignment="start"
        renderItem={({ item }) => (
          <Flex
            width={200}
            height={250}
            background="hotpink"
            radius={12}
            align="center"
            justify="center"
          >
            <Text size={16} weight="700" centered>
              {item}
            </Text>
          </Flex>
        )}
      />
    </SafeAreaView>
  );
}
