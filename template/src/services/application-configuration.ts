import Config from 'react-native-config';
import { singleton } from 'tsyringe';
import Storage from '~/services/storage';

export type ApplicationConfigurationKey = keyof typeof Config;

@singleton()
export default class ApplicationConfiguration extends Storage<ApplicationConfigurationKey> {
  private defaultValues: Record<
    ApplicationConfigurationKey,
    string | number | boolean
  > = {
    API_URL: Config.API_URL!,
    KILLSWITCH_API_KEY_ANDROID: Config.KILLSWITCH_API_KEY_ANDROID!,
    KILLSWITCH_API_KEY_IOS: Config.KILLSWITCH_API_KEY_IOS!,
    KILLSWITCH_API_URL: Config.KILLSWITCH_API_URL!,
    SECRET_PANEL_ENABLED: this.asBoolean(Config.SECRET_PANEL_ENABLED!),
    STORAGE_KEY_PREFIX: Config.STORAGE_KEY_PREFIX!,
  };

  getItem(key: ApplicationConfigurationKey) {
    const value = super.getItem(key);

    return typeof value === 'undefined' ? this.defaultValues[key] : value;
  }

  private asBoolean(variable: string): boolean {
    return ['1', 'true'].includes(variable);
  }

  private asInteger(variable: string): number {
    return parseInt(variable, 10);
  }

  private asFloat(variable: string): number {
    return parseFloat(variable);
  }
}
