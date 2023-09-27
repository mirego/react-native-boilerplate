import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { ActivityIndicator, Button, Flex } from '../components/kit';
import { useToaster, Text } from '~/components/kit';
import { useService } from '~/hooks/use-service';
import Geolocation, {
  GeolocationState,
  GeolocationStatus,
} from '~/services/geolocation';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const geolocation = useService(Geolocation);

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

  function addToast() {
    toaster.add({ title: 'derp', details: 'Herp derp', type: 'success' });
  }

  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex grow gap={10} padding={20} fill justify="center" align="center">
        <Text testID="test-label">{t('test')}</Text>

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
      </Flex>
    </SafeAreaView>
  );
}
