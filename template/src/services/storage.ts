import { MMKV } from 'react-native-mmkv';
import { singleton } from 'tsyringe';
import EventEmitter from '~/services/event-emitter';

export interface StorageSubscriptionParams<KeyType> {
  key: KeyType;
  value: any;
}

export type StorageSubscription<KeyType> = (
  params: StorageSubscriptionParams<KeyType>
) => void;

@singleton()
export default class Storage<KeyType extends string> {
  constructor(
    private eventEmitter: EventEmitter<
      'storage',
      StorageSubscriptionParams<KeyType>
    >
  ) {
    this.storage.addOnValueChangedListener((changedKey) => {
      this.eventEmitter.emit('storage', {
        key: changedKey as KeyType,
        value: this.getItem(changedKey as KeyType),
      });
    });
  }

  protected storage = new MMKV();

  getItem(key: KeyType) {
    const value = this.storage.getString(key);
    return value ? JSON.parse(value) : undefined;
  }

  setItem(key: KeyType, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  removeItem(key: KeyType) {
    this.storage.delete(key);
  }

  clear() {
    this.storage.clearAll();
  }

  contains(key: KeyType) {
    return this.storage.contains(key);
  }

  subscribe(callback: StorageSubscription<KeyType>) {
    this.eventEmitter.subscribe('storage', callback);

    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: StorageSubscription<KeyType>) {
    this.eventEmitter.unsubscribe('storage', callback);
  }
}
