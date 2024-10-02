import remoteConfig from '@react-native-firebase/remote-config';
import { BehaviorSubject } from 'rxjs';
import { singleton } from 'tsyringe';
import { Duration } from '~/utils/Duration';

export type RemoteConfig = {
  some_feature_flag: boolean;
};

export type RemoteConfigValue = boolean | number | string;

export type RemoteConfigKey = keyof RemoteConfig;

export type RemoteConfigSubjects = {
  [K in RemoteConfigKey]: BehaviorSubject<RemoteConfig[K]>;
};

export type RemoteConfigSubscribeCallback<K extends RemoteConfigKey> = (
  value: RemoteConfig[K]
) => void;

export type RemoteConfigUnsubscribe = () => void;

export type RemoteConfigSettings = {
  timeout: Duration;
  cache: Duration;
};

@singleton()
export default class RemoteConfigService {
  private static readonly DEFAULTS: RemoteConfig = {
    some_feature_flag: true,
  };

  private static readonly SETTINGS: RemoteConfigSettings = {
    timeout: Duration.from('seconds', 30),
    cache: Duration.from('minutes', 10),
  };

  private readonly configs: RemoteConfigSubjects = {
    some_feature_flag: new BehaviorSubject(
      RemoteConfigService.DEFAULTS.some_feature_flag
    ),
  };

  constructor() {
    this.init();
  }

  private removeOnConfigUpdated = remoteConfig().onConfigUpdated(() => {
    this.updateConfigs();
  });

  private async init() {
    await this.setConfigSettings();
    await this.setDefaults();
    await this.fetchAndActivate();
    this.updateConfigs();
  }

  private fetchAndActivate() {
    return remoteConfig().fetchAndActivate();
  }

  private setConfigSettings() {
    return remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis:
        RemoteConfigService.SETTINGS.cache.to('milliseconds'),
      fetchTimeMillis: RemoteConfigService.SETTINGS.timeout.to('milliseconds'),
    });
  }

  private setDefaults() {
    return remoteConfig().setDefaults(RemoteConfigService.DEFAULTS);
  }

  private updateConfigs() {
    Object.keys(RemoteConfigService.DEFAULTS).forEach((key) => {
      this.updateConfig(key as RemoteConfigKey);
    });
  }

  private updateConfig(key: RemoteConfigKey) {
    const $config: BehaviorSubject<any> = this.configs[key];
    const value = this.getRemoteValue(key);

    if ($config.getValue() !== value) {
      $config.next(value);
    }
  }

  private getRemoteValue<K extends RemoteConfigKey>(key: K): RemoteConfig[K] {
    switch (typeof RemoteConfigService.DEFAULTS[key]) {
      case 'boolean':
        return this.getRemoteBoolean(key) as any;

      case 'number':
        return this.getRemoteNumber(key) as any;

      case 'string':
        return this.getRemoteString(key) as any;
    }
  }

  private getRemoteBoolean(key: RemoteConfigKey) {
    return remoteConfig().getValue(key).asBoolean();
  }

  private getRemoteNumber(key: RemoteConfigKey) {
    return remoteConfig().getValue(key).asNumber();
  }

  private getRemoteString(key: RemoteConfigKey) {
    return remoteConfig().getValue(key).asString();
  }

  getConfigValue<K extends RemoteConfigKey>(key: K): RemoteConfig[K] {
    return this.configs[key].getValue();
  }

  subscribe<K extends RemoteConfigKey>(
    key: K,
    callback: RemoteConfigSubscribeCallback<K>
  ): RemoteConfigUnsubscribe {
    const subscription = this.configs[key].subscribe((value) => {
      callback(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }

  destroy() {
    this.removeOnConfigUpdated();
  }
}
