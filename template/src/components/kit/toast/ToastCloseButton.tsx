import { StyleSheet } from 'react-native';
import { Icon } from '../icon';
import { Squishable } from '../squishable';

interface ToastCloseButtonProps {
  onPress: () => void;
}

const styles = StyleSheet.create({
  closeButtonWrapper: {
    zIndex: 3,
    flexGrow: 1,
    flexShrink: 0,
  },
  closeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});

export function ToastCloseButton({ onPress }: ToastCloseButtonProps) {
  return (
    <Squishable
      style={styles.closeButtonWrapper}
      onPress={onPress}
      hitSlop={16}
    >
      <Icon name="close" size={24} tintColor={['#2F364F', '#F8F5F3']} />
    </Squishable>
  );
}
