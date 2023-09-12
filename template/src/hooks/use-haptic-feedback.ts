import { useCallback } from 'react';
import ReactNativeHapticFeedback, {
  HapticOptions,
} from 'react-native-haptic-feedback';

export function useHapticFeedback(
  type = 'impactLight',
  options?: HapticOptions
) {
  return useCallback(() => {
    ReactNativeHapticFeedback.trigger(type, options);
  }, [type, options]);
}
