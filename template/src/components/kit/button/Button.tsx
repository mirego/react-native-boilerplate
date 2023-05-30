import { ReactNode } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Animated, {
  AnimatedStyleProp,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { IconName } from '../icon';
import { Squishable } from '../squishable';
import { ButtonIcon, ButtonIconContainer } from './ButtonIcon';
import { ButtonLabel } from './ButtonLabel';
import { ButtonSize, ButtonTheme } from './types';
import {
  getButtonColorWorklet,
  getButtonSizeStyle,
  getButtonState,
  getButtonStateWorklet,
  getTextColor,
} from './utils';
import useInitialized from '~/hooks/use-initialized';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  theme?: ButtonTheme;
  size?: ButtonSize;
  leftIcon?: Exclude<ReactNode, string> | IconName;
  rightIcon?: Exclude<ReactNode, string> | IconName;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const SPRING_CONFIG: WithSpringConfig = {
  damping: 10,
  stiffness: 400,
  overshootClamping: true,
};

const stylesheet = StyleSheet.create({
  base: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  labelContainer: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});

const getButtonStyle = (
  theme: ButtonTheme,
  size: ButtonSize,
  pressed: boolean,
  style: PressableProps['style'],
  animatedButtonStyle: AnimatedStyleProp<ViewStyle>
) => [
  stylesheet.base,
  animatedButtonStyle,
  theme === 'outlined' ? stylesheet.outlined : null,
  getButtonSizeStyle(size),
  typeof style === 'function' ? style({ pressed }) : style,
];

export function Button({
  theme = 'primary',
  size = 'large',
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  loading = false,
  style,
  buttonStyle,
  children,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const hasIcon = Boolean(leftIcon || rightIcon);

  const { ifInitialized } = useInitialized();

  const isPressed = useSharedValue(false);

  function onPressIn(event: GestureResponderEvent) {
    props.onPressIn?.(event);
    if (event.isDefaultPrevented()) return;
    isPressed.value = true;
  }

  function onPressOut(event: GestureResponderEvent) {
    props.onPressOut?.(event);
    if (event.isDefaultPrevented()) return;
    isPressed.value = false;
  }

  const animatedButtonStyle = useAnimatedStyle(() => {
    const colorProperty =
      theme === 'outlined' ? 'borderColor' : 'backgroundColor';
    const otherColorProperty =
      theme === 'outlined' ? 'backgroundColor' : 'borderColor';
    const state = getButtonStateWorklet({ pressed: isPressed.value, disabled });
    const color = getButtonColorWorklet(theme, state, colorScheme);

    return {
      [colorProperty]: withSpring(color, SPRING_CONFIG),
      [otherColorProperty]: undefined,
    };
  });

  const scheme = useColorScheme();

  return (
    <Squishable
      style={[stylesheet.base, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      {...props}
    >
      {({ pressed }) => {
        const child =
          typeof children === 'function' ? children({ pressed }) : children;

        const label =
          typeof child === 'string' ? (
            <ButtonLabel
              theme={theme}
              size={size}
              disabled={disabled}
              pressed={pressed}
            >
              {child}
            </ButtonLabel>
          ) : (
            child
          );

        const left =
          typeof leftIcon === 'string' ? (
            <ButtonIcon
              theme={theme}
              size={size}
              disabled={disabled}
              pressed={pressed}
              name={leftIcon as IconName}
            />
          ) : (
            leftIcon
          );

        const right =
          typeof rightIcon === 'string' ? (
            <ButtonIcon
              theme={theme}
              size={size}
              disabled={disabled}
              pressed={pressed}
              name={rightIcon as IconName}
            />
          ) : (
            rightIcon
          );

        const buttonState = getButtonState({ pressed, disabled });

        return (
          <Animated.View
            style={getButtonStyle(
              theme,
              size,
              pressed,
              buttonStyle,
              animatedButtonStyle
            )}
          >
            {hasIcon && (
              <ButtonIconContainer key="left-icon" size={size}>
                {left}
              </ButtonIconContainer>
            )}

            <View key="label" style={stylesheet.labelContainer}>
              {loading ? (
                <Animated.View
                  key="loading"
                  entering={ifInitialized(FadeInRight)}
                  exiting={ifInitialized(FadeOutRight)}
                >
                  <ActivityIndicator
                    size={18}
                    color={
                      getTextColor(theme, buttonState)[
                        scheme === 'light' ? 1 : 0
                      ]
                    }
                  />
                </Animated.View>
              ) : (
                <Animated.View
                  key="label"
                  entering={ifInitialized(FadeInLeft)}
                  exiting={ifInitialized(FadeOutLeft)}
                >
                  {label}
                </Animated.View>
              )}
            </View>

            {hasIcon && (
              <ButtonIconContainer key="right-icon" size={size}>
                {right}
              </ButtonIconContainer>
            )}
          </Animated.View>
        );
      }}
    </Squishable>
  );
}
