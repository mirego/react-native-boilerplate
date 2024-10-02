import RNRestart from 'react-native-restart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { Button, Flex, Text } from '../components/kit';
import { useService } from '~/hooks/use-service';
import ApplicationConfiguration, {
  ApplicationConfigurationKey,
} from '~/services/application-configuration';

const FOOTER_HEIGHT = 64;

export type SecretConfigScreenProps = RootStackScreenProps<'SecretConfig'>;

export function SecretConfigScreen({ navigation }: SecretConfigScreenProps) {
  const { t } = useTranslation('screens', { keyPrefix: 'secret-config' });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('title'),
      headerTitleStyle: {
        color: '#2F364F',
      },
      headerTintColor: '#2F364F',
      headerStyle: {
        backgroundColor: '#eee',
      },
    });
  });

  const insets = useSafeAreaInsets();

  const applicationConfiguration = useService(ApplicationConfiguration);

  const [apiUrl, setApiUrl] = useState(
    applicationConfiguration.getItem('API_URL')
  );

  useEffect(() => {
    return applicationConfiguration.subscribe((config) => {
      if (config.key === 'API_URL') {
        setApiUrl(config.value);
      }
    });
  }, [applicationConfiguration]);

  const saveAll = useCallback(() => {
    applicationConfiguration.setItem('API_URL', apiUrl);

    RNRestart.restart();
  }, [apiUrl, applicationConfiguration]);

  const resetConfig = useCallback(
    (configName: ApplicationConfigurationKey) => {
      applicationConfiguration.removeItem(configName);
    },
    [applicationConfiguration]
  );

  const cancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Flex
      grow
      background="#eee"
      justify="space-between"
      padding={[0, 0, FOOTER_HEIGHT + insets.bottom]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        animated
      />

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}
      >
        <Flex gap={20}>
          <Flex gap={3}>
            <Text color="#2F364F" weight="700">
              {t('labels.api-url')}
            </Text>

            <Flex gap={8} row>
              <TextInput
                value={apiUrl}
                onChangeText={setApiUrl}
                style={styles.textInput}
              />

              <Button theme="secondary" onPress={() => resetConfig('API_URL')}>
                {t('reset')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>

      <Flex
        absolute
        bottom={0}
        left={0}
        height={FOOTER_HEIGHT + insets.bottom + 15}
        width="100%"
        row
        gap={8}
        padding={[15, 20, insets.bottom + 15]}
        background="#eee"
        style={styles.footer}
      >
        <Flex as={Button} theme="secondary" grow onPress={cancel}>
          {t('cancel')}
        </Flex>

        <Flex as={Button} theme="primary" grow onPress={saveAll}>
          {t('save')}
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flexGrow: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    fontSize: 14,
    color: '#333',
  },
  footer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
