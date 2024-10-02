import { snakeCase } from 'lodash';
import Config from 'react-native-config';

const PREFIX = Config.STORAGE_KEY_PREFIX;

export function createStorageKey(key: string) {
  return `${PREFIX}_${snakeCase(key)}`.toUpperCase();
}
