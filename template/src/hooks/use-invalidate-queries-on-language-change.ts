import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useInvalidateQueriesOnLanguageChange() {
  const { i18n } = useTranslation();
  const languageRef = useRef(i18n.language);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (i18n.language === languageRef.current) {
      return;
    }

    // Evict everything from the cache but don't refetch anything. Queries will
    // be refetched when they become "enabled" when their screen gains focus.
    queryClient.invalidateQueries({
      refetchType: 'none',
    });
  }, [queryClient, i18n.language]);
}
