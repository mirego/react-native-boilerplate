import { View, ViewProps } from 'react-native';
import { Icon, IconProps } from '../icon';
import { ButtonSize, ButtonTheme } from './types';
import { getButtonState, getIconSize, getTextColor } from './utils';

export interface ButtonIconProps extends Omit<IconProps, 'size'> {
  theme: ButtonTheme;
  size: ButtonSize;
  disabled: boolean;
  pressed: boolean;
}

export interface ButtonIconContainerProps extends ViewProps {
  size: ButtonSize;
}

export function ButtonIconContainer({
  size,
  style,
  ...props
}: ButtonIconContainerProps) {
  return <View style={[{ flexBasis: getIconSize(size) }, style]} {...props} />;
}

export function ButtonIcon({
  theme,
  size,
  disabled,
  pressed,
  ...props
}: ButtonIconProps): JSX.Element {
  const state = getButtonState({ pressed, disabled });

  return (
    <Icon
      size={getIconSize(size)}
      tintColor={getTextColor(theme, state)}
      {...props}
    />
  );
}
