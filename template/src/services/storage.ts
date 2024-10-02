import { MMKV } from 'react-native-mmkv';
import { singleton } from 'tsyringe';
import EventEmitter from '~/services/event-emitter';

export interface StorageSubscriptionParams {
  key: string;
  value: any;
}

export type StorageSubscription = (params: StorageSubscriptionParams) => void;

@singleton()
export default class Storage {
  constructor(
    private eventEmitter: EventEmitter<'storage', StorageSubscriptionParams>
  ) {
    this.storage.addOnValueChangedListener((changedKey) => {
      this.eventEmitter.emit('storage', {
        key: changedKey,
        value: this.getItem(changedKey),
      });
    });
  }

  storage = new MMKV();

  getItem<Value = any>(key: string): Value | null {
    const value = this.storage.getString(key);

    if (value === undefined) {
      return null;
    }

    return JSON.parse(value);
  }

  setItem(key: string, value: any) {
    return this.storage.set(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }

  clear() {
    this.storage.clearAll();
  }

  contains(key: string) {
    return this.storage.contains(key);
  }

  subscribe(callback: StorageSubscription) {
    this.eventEmitter.subscribe('storage', callback);

    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: StorageSubscription) {
    this.eventEmitter.unsubscribe('storage', callback);
  }
}
