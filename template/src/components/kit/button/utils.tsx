import { ColorSchemeName, ViewStyle } from 'react-native';
import {
  ButtonSize,
  ButtonState,
  ButtonStateColor,
  ButtonTheme,
} from './types';

export const textSizes: Record<ButtonSize, number> = {
  large: 16,
  small: 13,
  tiny: 12,
  mini: 11,
};

export const textColors: Record<ButtonTheme, ButtonStateColor> = {
  primary: {
    default: ['#F8F5F3', '#F8F5F3'],
    pressed: ['#F8F5F3', '#F8F5F3'],
    disabled: ['#CDCFD4', '#CDCFD4'],
  },
  secondary: {
    default: ['#22727D', '#CBDCDE'],
    pressed: ['#22727D', '#CBDCDE'],
    disabled: ['#CDCFD4', '#CDCFD4'],
  },
  outlined: {
    default: ['#2F364F', '#F8F5F3'],
    pressed: ['#2F364F', '#F8F5F3'],
    disabled: ['#2F364F', '#7E8291'],
  },
};

export function getTextSize(size: ButtonSize) {
  return textSizes[size];
}

export function getTextColor(theme: ButtonTheme, state: ButtonState) {
  return textColors[theme][state];
}

interface GetButtonStateParams {
  pressed: boolean;
  disabled: boolean;
}

export function getButtonState({ pressed, disabled }: GetButtonStateParams) {
  return disabled ? 'disabled' : pressed ? 'pressed' : 'default';
}

export function getButtonStateWorklet({
  pressed,
  disabled,
}: GetButtonStateParams) {
  'worklet';
  return disabled ? 'disabled' : pressed ? 'pressed' : 'default';
}

export const iconSizes: Record<ButtonSize, number> = {
  large: 24,
  small: 16,
  tiny: 16,
  mini: 12,
};

export function getIconSize(size: ButtonSize) {
  return iconSizes[size];
}

export const buttonColors: Record<ButtonTheme, ButtonStateColor> = {
  primary: {
    default: ['#2F364F', '#575C70'],
    pressed: ['#111217', '#7E8291'],
    disabled: ['#A6A9B3', '#A6A9B3'],
  },
  secondary: {
    default: ['#CBDCDE', 'rgba(77, 144, 153, 0.55)'],
    pressed: ['#B5CFD2', '#4D9099'],
    disabled: ['#A6A9B3', '#A6A9B3'],
  },
  outlined: {
    default: ['#B9BBC3', '#6A6F80'],
    pressed: ['#2F364F', '#B9BBC3'],
    disabled: ['#B9BBC3', '#7E8291'],
  },
};

export function getButtonColor(
  theme: ButtonTheme,
  state: ButtonState,
  scheme: ColorSchemeName
) {
  return buttonColors[theme][state][scheme === 'light' ? 0 : 1];
}

export function getButtonColorWorklet(
  theme: ButtonTheme,
  state: ButtonState,
  scheme: ColorSchemeName
) {
  'worklet';
  return buttonColors[theme][state][scheme === 'light' ? 0 : 1];
}

export const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
  large: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 8,
    height: 48,
    minWidth: 48,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  small: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 8,
    height: 40,
    minWidth: 40,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  tiny: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 4,
    height: 32,
    minWidth: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  mini: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 4,
    height: 28,
    minWidth: 28,
    borderRadius: 19,
    paddingHorizontal: 8,
  },
};

export function getButtonSizeStyle(size: ButtonSize) {
  return buttonSizeStyles[size];
}
