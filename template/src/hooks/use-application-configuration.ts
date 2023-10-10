import { useEffect, useState } from 'react';
import { useService } from '~/hooks/use-service';
import ApplicationConfiguration, {
  ApplicationConfigurationKey,
} from '~/services/application-configuration';

export function useApplicationConfiguration(key: ApplicationConfigurationKey) {
  const applicationConfiguration = useService(ApplicationConfiguration);

  const [value, setValue] = useState(applicationConfiguration.getItem(key));

  useEffect(() => {
    return applicationConfiguration.subscribe((config) => {
      if (config.key === key) {
        setValue(config.value);
      }
    });
  }, [applicationConfiguration, key]);

  return value;
}
