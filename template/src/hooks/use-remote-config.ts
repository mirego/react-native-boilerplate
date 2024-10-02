import { useEffect, useState } from 'react';
import { useService } from './use-service';
import RemoteConfigService, {
  RemoteConfig,
  RemoteConfigKey,
} from '~/services/remote-config';

export function useRemoteConfig<K extends RemoteConfigKey>(
  key: K
): RemoteConfig[K] {
  const remoteConfigService = useService(RemoteConfigService);
  const [value, setValue] = useState(() =>
    remoteConfigService.getConfigValue(key)
  );

  useEffect(() => {
    setValue(remoteConfigService.getConfigValue(key));

    const unsubscribe = remoteConfigService.subscribe(key, (newValue) =>
      setValue(newValue)
    );

    return () => {
      unsubscribe();
    };
  }, [key, remoteConfigService]);

  return value;
}
