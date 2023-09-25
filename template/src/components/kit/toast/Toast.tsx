import React, { ReactNode, useCallback, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { Flex } from '../flex';
import { Text } from '../typography';

import { ToastCloseButton } from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import { ToastType } from './types';
import {
  ColorSchemeValue,
  useColorSchemeValue,
} from '~/hooks/use-color-scheme-value';

const DEFAULT_AUTO_DISMISS_DELAY_MS = 7000;

export interface ToastProps {
  title: string;
  details?: string | ReactNode;
  type: ToastType;
  autoDismiss?: boolean;
  autoDismissDelayMs?: number;
  onClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 18,
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const ToastTypeBorderColor: Record<ToastType, ColorSchemeValue<string>> = {
  error: ['#FCE4DF', 'rgba(229, 145, 126, 0.16)'],
  warning: ['#FCE4DF', 'rgba(229, 145, 126, 0.16)'],
  success: ['#D4EDD4', 'rgba(25, 118, 79, 0.24)'],
  info: ['#D4ECEA', 'rgba(77, 144, 153, 0.16)'],
};

export function Toast({
  type,
  title,
  details,
  autoDismiss = true,
  autoDismissDelayMs = DEFAULT_AUTO_DISMISS_DELAY_MS,
  onClose,
}: ToastProps) {
  const backgroundColor = useColorSchemeValue(['#fff', '#15171E']);
  const borderColor = useColorSchemeValue(ToastTypeBorderColor[type]);
  const windowWidth = useWindowDimensions().width;
  const translateX = useSharedValue(0);
  const closed = useSharedValue(false);
  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = clamp(
        translateX.value + event.changeX,
        -windowWidth,
        windowWidth
      );
    })
    .onEnd((event) => {
      const direction = Math.sign(event.velocityX) || -1;
      translateX.value = withSpring(
        windowWidth * direction,
        {
          velocity: event.velocityX,
          damping: 20,
          stiffness: 150,
          restDisplacementThreshold: 20,
          overshootClamping: false,
        },
        () => {
          closed.value = true;
        }
      );
    });

  // We use this instead of calling onClose directly in the withSpring callback
  // to work around a bug that makes the app crash on reload in development
  useAnimatedReaction(
    () => closed.value,
    (isClosed) => {
      if (isClosed) {
        runOnJS(onClose)();
      }
    }
  );

  const style = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [translateX]
  );

  const handleClose = useCallback(() => {
    translateX.value = withSpring(
      windowWidth * -1,
      {
        overshootClamping: false,
        damping: 20,
        stiffness: 150,
        restDisplacementThreshold: 20,
      },
      () => {
        runOnJS(onClose)();
      }
    );
  }, [onClose, windowWidth, translateX]);

  useEffect(() => {
    if (!autoDismiss) {
      return;
    }

    const timer = setTimeout(handleClose, autoDismissDelayMs);

    return () => clearTimeout(timer);
  }, [autoDismiss, autoDismissDelayMs, handleClose]);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>
        <Flex
          row
          padding={16}
          gap={8}
          style={[styles.container, { backgroundColor, borderColor }]}
        >
          <Flex>
            <ToastIcon type={type} />
          </Flex>

          <Flex gap={0} grow shrink>
            <Text weight="700">{title}</Text>

            {typeof details === 'string' && Boolean(details) ? (
              <Text>{details}</Text>
            ) : (
              details
            )}
          </Flex>

          <Flex>
            <ToastCloseButton onPress={handleClose} />
          </Flex>
        </Flex>
      </Animated.View>
    </GestureDetector>
  );
}
