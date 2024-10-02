import DeviceInfo from 'react-native-device-info';
import { BehaviorSubject } from 'rxjs';
import semver from 'semver';
import { autoInjectable, singleton } from 'tsyringe';
import Storage from './storage';
import { createStorageKey } from '~/utils/create-storage-key';

const FIRST_OPENED_APP_VERSION_STORAGE_KEY = createStorageKey(
  'FIRST_OPENED_APP_VERSION'
);

/**
  Never remove a feature flag from here (except the boilerplate examples).
  Keep them even after removing the feature so
  we won't reuse those keys in the future.

  The string is a semver range.
  When the stored first opened app version satisfies that range,
  the feature is considered new for that user.
*/
const FEATURES = {
  new_feature_example: '<=1.2.x',
};

export type Feature = keyof typeof FEATURES;

@singleton()
@autoInjectable()
export default class NewFeaturesService {
  currentAppVersion = DeviceInfo.getVersion();
  firstOpenedAppVersion = new BehaviorSubject<string | null>(null);

  private readonly features = Object.keys(FEATURES).reduce(
    (features, feature) => {
      features[feature as Feature] = new BehaviorSubject(false);
      return features;
    },
    {} as Record<Feature, BehaviorSubject<boolean>>
  );

  constructor(private storage: Storage) {
    this.init();
  }

  private init() {
    this.restore();
  }

  private getFirstOpenedAppVersion() {
    const firstOpenedAppVersion = this.storage.getItem(
      FIRST_OPENED_APP_VERSION_STORAGE_KEY
    );

    if (!firstOpenedAppVersion) {
      this.storage.setItem(
        FIRST_OPENED_APP_VERSION_STORAGE_KEY,
        this.currentAppVersion
      );
      return this.currentAppVersion;
    }

    return firstOpenedAppVersion;
  }

  private async restore() {
    const features = Object.keys(FEATURES) as Feature[];
    const allFeatureKeys = features.map((feature) =>
      this.getStorageKey(feature)
    );
    const allFeatureStatuses = allFeatureKeys.map((key) => [
      key,
      this.storage.getItem(key),
    ]);
    const firstOpenedAppVersion = this.getFirstOpenedAppVersion();

    allFeatureStatuses.forEach(([_featureStorageKey, value], index) => {
      const feature = features[index];
      const parsedValue = value && JSON.parse(value);

      if (typeof parsedValue === 'boolean') {
        this.features[feature].next(parsedValue);
        return;
      }

      const range = FEATURES[feature];
      const isNew = semver.satisfies(firstOpenedAppVersion, range);
      this.features[feature].next(isNew);
    });
  }

  private getStorageKey(feature: Feature) {
    return createStorageKey(`new-feature-${feature}`);
  }

  getFeatureStatus(feature: Feature): boolean {
    return this.features[feature].getValue();
  }

  markFeatureAsSeen(feature: Feature) {
    this.features[feature].next(false);
    const key = this.getStorageKey(feature);
    this.storage.setItem(key, false);
  }

  subscribe(feature: Feature, callback: (isNew: boolean) => void): () => void {
    const subscription = this.features[feature].subscribe((isNew) => {
      callback(isNew);
    });

    return () => {
      subscription.unsubscribe();
    };
  }
}
