import { useNavigation } from '@react-navigation/native';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import {
  BackHandler,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Extrapolation } from 'react-native-reanimated';
import { Flex } from '../flex';
import { Handle } from './Handle';
import { useColorSchemeValue } from '~/hooks/use-color-scheme-value';

const BOTTOM_OFFSET_PADDING = 50;
const TRANSLATE_Y_CLOSE_THRESHOLD = 75;
const VELOCITY_Y_CLOSE_THRESHOLD = 150;
const UP = -1;
const DOWN = 1;
const UNKNOWN = 0;

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    overflow: 'hidden',
  },
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const BottomSheet = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  const navigation = useNavigation();
  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const translateY = useSharedValue(0);
  const height = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollViewRef);
  const isPanning = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      const direction = Math.sign(changeY);

      if (direction === UNKNOWN) return;

      if (direction === UP && translateY.value === height.value) {
        isPanning.value = false;
        return;
      }

      if (direction === DOWN && scrollOffset.value !== 0) {
        isPanning.value = false;
        return;
      }

      isPanning.value = true;
      translateY.value = clamp(translateY.value - changeY, 0, height.value);
    })
    .onEnd(({ velocityY }) => {
      if (!isPanning.value) return;
      isPanning.value = false;

      const shouldClose =
        translateY.value <= height.value - TRANSLATE_Y_CLOSE_THRESHOLD ||
        velocityY > VELOCITY_Y_CLOSE_THRESHOLD;

      translateY.value = withSpring(
        shouldClose ? 0 : height.value,
        {
          velocity: velocityY,
          stiffness: 250,
          damping: 25,
          overshootClamping: shouldClose,
          restDisplacementThreshold: 1,
        },
        (finished) => {
          if (finished && shouldClose) runOnJS(onClose)();
        }
      );
    });

  // First open reaction
  useAnimatedReaction(
    () => height.value > 0,
    (bottomSheetHasLayout) => {
      if (!bottomSheetHasLayout) return;

      translateY.value = withDelay(
        150,
        withSpring(height.value, {
          stiffness: 250,
          damping: 25,
        })
      );
    }
  );

  const handleOnPressOutside = () => beginClose();

  const beginClose = useCallback(() => {
    translateY.value = withTiming(0, {}, (finished) => {
      if (finished) runOnJS(onClose)();
    });
  }, [translateY, onClose]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        beginClose();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [beginClose]);

  const animatedBottomSheet = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -translateY.value }],
      paddingBottom: insets.bottom + BOTTOM_OFFSET_PADDING,
    }),
    [translateY]
  );

  const overlayColor = useColorSchemeValue([
    'rgba(21, 23, 30, 0.33)',
    'rgba(0, 0, 0, 0.66)',
  ]);

  const indicatorStyle = useColorSchemeValue<'black' | 'white'>([
    'black',
    'white',
  ]);

  const sheetColor = useColorSchemeValue(['#fff', '#1E2334']);

  const nativeGesture = Gesture.Native();
  const composedGestures = Gesture.Simultaneous(panGesture, nativeGesture);

  const scrollViewAnimatedProps = useAnimatedProps(() => {
    return {
      scrollEnabled: !isPanning.value,
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, height.value],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Flex as={Animated.View} grow>
      <Flex
        as={AnimatedPressable}
        fill
        onPress={handleOnPressOutside}
        style={[{ backgroundColor: overlayColor }, overlayStyle]}
      />

      <Flex
        as={Animated.View}
        absolute
        top="100%"
        left={0}
        width="100%"
        gap={16}
        style={[
          styles.sheet,
          animatedBottomSheet,
          { backgroundColor: sheetColor },
          { maxHeight: windowHeight - insets.top + BOTTOM_OFFSET_PADDING },
        ]}
        onLayout={(event: LayoutChangeEvent) => {
          height.value =
            event.nativeEvent.layout.height - BOTTOM_OFFSET_PADDING;
        }}
      >
        <GestureDetector gesture={composedGestures}>
          <Animated.ScrollView
            ref={scrollViewRef}
            indicatorStyle={indicatorStyle}
            bounces={false}
            overScrollMode="never"
            scrollEventThrottle={16}
            animatedProps={scrollViewAnimatedProps}
            stickyHeaderIndices={[0]}
            scrollIndicatorInsets={{ top: 32, left: 0, right: 0, bottom: 0 }}
          >
            <Flex
              row
              align="center"
              justify="center"
              height={32}
              style={{ backgroundColor: sheetColor }}
            >
              <Handle />
            </Flex>

            {children}
          </Animated.ScrollView>
        </GestureDetector>
      </Flex>
    </Flex>
  );
};
