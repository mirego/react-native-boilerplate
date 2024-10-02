import { ViewStyle } from 'react-native';
import { Padding, Radius, Size } from './types';

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

export function getRadiusStyle(radius?: Radius): ViewStyle | null {
  if (radius === undefined) {
    return null;
  }

  if (typeof radius === 'number') {
    return { borderRadius: radius };
  }

  if (radius.length === 2) {
    const [topLeftAndBottomRight, topRightAndBottomLeft] = radius;
    return {
      borderTopLeftRadius: topLeftAndBottomRight,
      borderTopRightRadius: topRightAndBottomLeft,
      borderBottomRightRadius: topLeftAndBottomRight,
      borderBottomLeftRadius: topRightAndBottomLeft,
    };
  }

  if (radius.length === 3) {
    const [topLeft, topRightAndBottomLeft, bottomRight] = radius;
    return {
      borderTopLeftRadius: topLeft,
      borderTopRightRadius: topRightAndBottomLeft,
      borderBottomRightRadius: bottomRight,
      borderBottomLeftRadius: topRightAndBottomLeft,
    };
  }

  const [topLeft, topRight, bottomRight, bottomLeft] = radius;
  return {
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomRightRadius: bottomRight,
    borderBottomLeftRadius: bottomLeft,
  };
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
