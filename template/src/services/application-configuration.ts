import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { singleton } from 'tsyringe';
import Storage from '~/services/storage';

export type ApplicationConfigurationKey = 'apiUrl';

@singleton()
export default class ApplicationConfiguration extends Storage<ApplicationConfigurationKey> {
  private defaultValues: Record<ApplicationConfigurationKey, string> = {
    apiUrl: Config.API_URL!,
  };

  protected get storage() {
    return new MMKV({ id: 'application-configuration' });
  }

  getItem(key: ApplicationConfigurationKey) {
    const value = super.getItem(key);

    return typeof value === 'undefined' ? this.defaultValues[key] : value;
  }
}
