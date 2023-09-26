import { singleton } from 'tsyringe';
import {
  default as DeviceGeolocation,
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import EventEmitter from '~/services/event-emitter';

export enum GeolocationStatus {
  Idle,
  Pending,
  Available,
  Error,
}

export interface GeolocationState {
  status: GeolocationStatus;
  position: GeolocationResponse | null;
  error: GeolocationError | null;
}

export type GeolocationSubscription = (params: GeolocationState) => void;

const DEFAULT_TIMEOUT = 10000;

@singleton()
export default class Geolocation {
  constructor(
    private eventEmitter: EventEmitter<'position', GeolocationState>
  ) {}

  private subscriptionsCount = 0;
  private watchId: number | null = null;

  private state: GeolocationState = {
    status: GeolocationStatus.Idle,
    position: null,
    error: null,
  };

  getCurrentPosition(
    options: GeolocationOptions = {
      enableHighAccuracy: false,
      timeout: DEFAULT_TIMEOUT,
      useSignificantChanges: true,
    }
  ) {
    return new Promise<GeolocationState>((resolve, reject) => {
      DeviceGeolocation.getCurrentPosition(
        (response) => {
          resolve({
            status: GeolocationStatus.Available,
            position: response,
            error: null,
          });
        },
        (error) => {
          reject({
            status: GeolocationStatus.Error,
            position: null,
            error,
          });
        },
        options
      );
    });
  }

  subscribe(callback: GeolocationSubscription) {
    this.eventEmitter.subscribe('position', callback);

    this.subscriptionsCount++;

    this.watchPosition();

    callback(this.state);
  }

  unsubscribe(callback: GeolocationSubscription) {
    this.eventEmitter.unsubscribe('position', callback);

    this.subscriptionsCount--;

    if (this.subscriptionsCount === 0) {
      this.unwatchPosition();
    }
  }

  private watchPosition(
    options: GeolocationOptions = {
      enableHighAccuracy: false,
      timeout: DEFAULT_TIMEOUT,
      useSignificantChanges: true,
    }
  ) {
    this.eventEmitter.emit('position', {
      status: GeolocationStatus.Pending,
      position: null,
      error: null,
    });

    DeviceGeolocation.getCurrentPosition(
      (position) => {
        this.eventEmitter.emit('position', {
          status: GeolocationStatus.Available,
          position,
          error: null,
        });
      },
      (error) => {
        this.eventEmitter.emit('position', {
          status: GeolocationStatus.Error,
          position: null,
          error,
        });
      },
      options
    );

    this.watchId = DeviceGeolocation.watchPosition(
      (position) => {
        this.eventEmitter.emit('position', {
          status: GeolocationStatus.Available,
          position,
          error: null,
        });
      },
      (error) => {
        this.eventEmitter.emit('position', {
          status: GeolocationStatus.Error,
          position: null,
          error,
        });
      },
      options
    );
  }

  private unwatchPosition() {
    if (this.watchId) {
      DeviceGeolocation.clearWatch(this.watchId);
    }
  }
}
