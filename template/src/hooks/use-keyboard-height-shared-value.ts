import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function useKeyboardHeightSharedValue() {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const keyboardWillShowSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        keyboardHeight.value = event.endCoordinates.height;
      }
    );

    const keyboardWillHideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardHeight.value = 0;
      }
    );

    return () => {
      keyboardWillShowSubscription.remove();
      keyboardWillHideSubscription.remove();
    };
  }, [keyboardHeight]);

  return keyboardHeight;
}
