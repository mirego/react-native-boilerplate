import VectorDrawable from '@klarna/react-native-vector-drawable';
import {
  AccessibilityProps,
  Image,
  ImageProps,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { IconName, IconSize } from './types';
import {
  ColorSchemeValue,
  useColorSchemeValue,
} from '~/hooks/use-color-scheme-value';

export interface IconProps extends AccessibilityProps {
  size: IconSize;
  name: ColorSchemeValue<IconName>;
  tintColor?: ColorSchemeValue<string>;
  style?: Omit<ImageProps['style'], 'resizeMode'>;
}

function getSizeStyle(size: IconSize): StyleProp<ViewStyle> {
  return {
    width: Array.isArray(size) ? size[0] : size,
    height: Array.isArray(size) ? size[1] : size,
  };
}

export function Icon({
  name: nameValue,
  size,
  tintColor,
  style,
  ...props
}: IconProps) {
  const name = useColorSchemeValue(nameValue);
  const tintColorValue = useColorSchemeValue(tintColor);
  const finalStyle = [
    tintColorValue ? { tintColor: tintColorValue } : null,
    { resizeMode: 'contain' },
    getSizeStyle(size),
    style,
  ];

  if (Platform.OS === 'android') {
    return <VectorDrawable resourceName={name} style={finalStyle} {...props} />;
  }

  return <Image source={{ uri: name }} style={finalStyle} {...props} />;
}
