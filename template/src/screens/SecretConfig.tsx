import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
      headerStyle: {
        backgroundColor: '#eee',
      },
    });
  });

  const insets = useSafeAreaInsets();

  const applicationConfiguration = useService(ApplicationConfiguration);

  const [apiUrl, setApiUrl] = useState(
    applicationConfiguration.getItem('apiUrl')
  );

  useEffect(() => {
    return applicationConfiguration.subscribe((config) => {
      if (config.key === 'apiUrl') {
        setApiUrl(config.value);
      }
    });
  }, [applicationConfiguration]);

  const saveAll = useCallback(() => {
    applicationConfiguration.setItem('apiUrl', apiUrl);

    navigation.goBack();
  }, [apiUrl, applicationConfiguration, navigation]);

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
      backgroundColor="#eee"
      justify="space-between"
      padding={[0, 0, FOOTER_HEIGHT + insets.bottom]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}
      >
        <Flex gap={20}>
          <Flex gap={3}>
            <Text weight="700">{t('labels.api-url')}</Text>

            <Flex gap={8} row>
              <Flex
                as={TextInput}
                grow
                value={apiUrl}
                onChangeText={setApiUrl}
                style={styles.textInput}
              />

              <Button theme="secondary" onPress={() => resetConfig('apiUrl')}>
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
        height={FOOTER_HEIGHT + insets.bottom}
        width="100%"
        row
        gap={8}
        padding={[15, 20, insets.bottom]}
        backgroundColor="#eee"
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
