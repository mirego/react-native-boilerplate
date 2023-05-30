import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextProps } from '../typography';

export interface DateTimeProps extends Omit<TextProps, 'children'> {
  date: Date;
  separator?: ReactNode;
}

export function DateTime({ date, separator = '•', ...props }: DateTimeProps) {
  const { i18n } = useTranslation();

  const datePart = useMemo(() => {
    return date.toLocaleString(i18n.language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [date, i18n.language]);

  const timePart = useMemo(() => {
    return date.toLocaleString(i18n.language, {
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [date, i18n.language]);

  return (
    <Text {...props}>
      {datePart}{' '}
      {typeof separator === 'string' ? <Text>{separator}</Text> : separator}{' '}
      {timePart}
    </Text>
  );
}
