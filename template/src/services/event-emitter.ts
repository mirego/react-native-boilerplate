import { injectable } from 'tsyringe';

export type EventEmitterSubscription<T> = (event: T) => void;

@injectable()
export default class EventEmitter<
  EventType extends string = string,
  EventData = any
> {
  #listeners = new Map<EventType, Set<EventEmitterSubscription<EventData>>>();

  subscribe(
    eventType: EventType,
    subscription: EventEmitterSubscription<EventData>
  ) {
    const subscriptions = this.#listeners.get(eventType) ?? new Set();

    this.#listeners.set(eventType, subscriptions.add(subscription));

    return () => this.unsubscribe(eventType, subscription);
  }

  unsubscribe(
    eventType: EventType,
    subscription: EventEmitterSubscription<EventData>
  ) {
    this.#listeners.get(eventType)?.delete(subscription);
  }

  emit(eventType: EventType, data: EventData) {
    this.#listeners.get(eventType)?.forEach((subscription) => {
      subscription(data);
    });
  }
}
