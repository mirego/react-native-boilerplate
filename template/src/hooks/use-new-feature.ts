import { useCallback, useEffect, useState } from 'react';
import { useService } from './use-service';
import NewFeatureService, { Feature } from '~/services/new-features';

type UseNewFeatureTuple = [isNew: boolean, markSeen: () => void];

export function useNewFeature(feature: Feature): UseNewFeatureTuple {
  const newFeatureService = useService(NewFeatureService);
  const [isNew, setIsNew] = useState(() =>
    newFeatureService.getFeatureStatus(feature)
  );

  const markSeen = useCallback(() => {
    newFeatureService.markFeatureAsSeen(feature);
  }, [feature, newFeatureService]);

  useEffect(() => {
    const unsubscribe = newFeatureService.subscribe(feature, (value) => {
      setIsNew(value);
    });

    return () => {
      unsubscribe();
    };
  }, [feature, newFeatureService]);

  return [isNew, markSeen];
}
