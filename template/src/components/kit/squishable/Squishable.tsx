import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

export const SQUISHABLE_SPRING_CONFIG: WithSpringConfig = {
  damping: 10,
  stiffness: 400,
  overshootClamping: true,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SquishableProps = PressableProps & Animated.AnimateProps<PressableProps>;

export function Squishable({ children, style, ...props }: SquishableProps) {
  const isPressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = isPressed.value ? 0.98 : 1;

    return {
      transform: [
        {
          scale: withSpring(scale, SQUISHABLE_SPRING_CONFIG),
        },
      ],
    };
  });

  return (
    <AnimatedPressable style={[style, animatedStyle]} {...props}>
      {({ pressed }: PressableStateCallbackType) => {
        isPressed.value = pressed;

        return typeof children === 'function'
          ? children({ pressed })
          : children;
      }}
    </AnimatedPressable>
  );
}
