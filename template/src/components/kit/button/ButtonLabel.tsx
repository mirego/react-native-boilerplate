import { TextProps } from 'react-native';
import { Text } from '../typography';
import { ButtonSize, ButtonTheme } from './types';
import { getButtonState, getTextColor, getTextSize } from './utils';

export interface ButtonLabelProps extends Omit<TextProps, 'size'> {
  theme: ButtonTheme;
  size?: ButtonSize;
  disabled?: boolean;
  pressed?: boolean;
}

export function ButtonLabel({
  theme,
  size = 'large',
  disabled = false,
  pressed = false,
  style,
  ...props
}: ButtonLabelProps): JSX.Element {
  const state = getButtonState({ pressed, disabled });

  return (
    <Text
      family="Quicksand"
      weight="700"
      size={getTextSize(size)}
      color={getTextColor(theme, state)}
      style={[{ textAlign: 'center' }, style]}
      numberOfLines={1}
      ellipsizeMode="tail"
      {...props}
    />
  );
}
