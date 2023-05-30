import { ViewStyle } from 'react-native';
import { Padding, Size } from './types';

export function getPaddingStyle(padding?: Padding): ViewStyle | null {
  if (padding === undefined) {
    return null;
  }

  if (typeof padding === 'number') {
    return { padding };
  }

  if (padding.length === 2) {
    const [paddingVertical, paddingHorizontal] = padding;
    return { paddingVertical, paddingHorizontal };
  }

  if (padding.length === 3) {
    const [paddingTop, paddingHorizontal, paddingBottom] = padding;
    return { paddingTop, paddingHorizontal, paddingBottom };
  }

  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
}

export function getSizeStyle(
  size?: Size
): Pick<ViewStyle, 'width' | 'height'> | null {
  if (size === undefined) {
    return null;
  }

  if (typeof size === 'number') {
    return { width: size, height: size };
  }

  return { width: size[0], height: size[0] };
}
