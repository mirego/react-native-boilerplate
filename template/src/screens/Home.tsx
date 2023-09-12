import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { ActivityIndicator, Button, Flex } from '../components/kit';
import { useToaster } from '~/components/kit';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
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
        <Text style={{ color: '#fff' }} testID="test-label">
          {t('test')}
        </Text>

        <ActivityIndicator size={50} />

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
