import { useTranslation } from 'react-i18next';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Button, Flex, Text } from '../kit';

export interface ErrorViewProps {
  retry?: () => void;
}

export function ErrorView({ retry }: ErrorViewProps) {
  const { t } = useTranslation('common', { keyPrefix: 'error-view' });

  const netInfo = useNetInfo();
  const [internetUnreachable, setInternetUnreachable] = useState(
    netInfo.isInternetReachable === false
  );

  useEffect(() => {
    if (netInfo.isInternetReachable === false) {
      setInternetUnreachable(true);
    }
  }, [netInfo]);

  return (
    <Flex grow justify="center" align="center" gap={16} padding={[50, 16]}>
      {/* <Icon name="error_exclamation" size={57} /> */}

      <Flex style={{ width: '100%', maxWidth: 300 }} padding={[0, 16]}>
        <Text.H2 centered>{t('title')}</Text.H2>
        <Text.P centered>
          {t(internetUnreachable ? 'maybe-client-issue' : 'maybe-server-issue')}
        </Text.P>

        {retry && (
          <Flex row align="center" justify="center" padding={[8, 0, 0]}>
            <Button
              onPress={retry}
              size="small"
              buttonStyle={{ paddingHorizontal: 18.5 }}
            >
              {t('retry')}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
