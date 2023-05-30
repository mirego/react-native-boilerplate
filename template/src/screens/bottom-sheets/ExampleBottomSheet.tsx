import { useTranslation } from 'react-i18next';
import { BottomSheet, Flex, Text } from '~/components/kit';

export function ExampleBottomSheet() {
  const { t } = useTranslation('example-sheet');

  return (
    <BottomSheet>
      <Flex padding={[20, 40, 40]} gap={32}>
        <Flex gap={6}>
          <Text.H2>{t('title')}</Text.H2>
          <Text.P>{t('details')}</Text.P>
        </Flex>
      </Flex>
    </BottomSheet>
  );
}
