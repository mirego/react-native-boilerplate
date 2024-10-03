import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  ComponentWithViewStyle,
  Padding,
  PolymorphicComponentProps,
  Radius,
} from '../shared/types';
import { getPaddingStyle, getRadiusStyle } from '../shared/utils';
import { FlexGap } from './types';
import { getFlexDirection, getGapStyle } from './utils';

export type FlexProps<C extends ComponentWithViewStyle = typeof View> =
  PolymorphicComponentProps<
    C,
    {
      row?: boolean;
      reverse?: boolean;
      gap?: FlexGap;
      padding?: Padding;
      align?: FlexStyle['alignItems'];
      alignSelf?: FlexStyle['alignSelf'];
      justify?: FlexStyle['justifyContent'];
      grow?: number | boolean;
      shrink?: number | boolean;
      basis?: FlexStyle['flexBasis'];
      wrap?: boolean;
      absolute?: boolean;
      zIndex?: number;
      top?: FlexStyle['top'];
      left?: FlexStyle['left'];
      bottom?: FlexStyle['bottom'];
      right?: FlexStyle['right'];
      width?: FlexStyle['width'];
      height?: FlexStyle['height'];
      fill?: boolean;
      radius?: Radius;
      background?: ViewStyle['backgroundColor'];
      style?: StyleProp<ViewStyle>;
    }
  >;

export const Flex = <C extends ComponentWithViewStyle = typeof View>({
  as,
  row = false,
  reverse = false,
  gap,
  padding,
  align = 'stretch',
  alignSelf = 'auto',
  justify = 'flex-start',
  grow = 0,
  shrink = 0,
  basis = 'auto',
  wrap = false,
  absolute = false,
  zIndex,
  top,
  left,
  bottom,
  right,
  width,
  height,
  fill = false,
  radius,
  background,
  style,
  forwardedRef,
  ...props
}: FlexProps<C>) => {
  const Comp = as || View;
  const finalStyle: StyleProp<ViewStyle> = [
    getPaddingStyle(padding),
    getGapStyle(gap),
    getRadiusStyle(radius),
    {
      flexGrow: Number(grow),
      flexShrink: Number(shrink),
      flexBasis: basis,
      alignItems: align,
      alignSelf,
      justifyContent: justify,
      flexDirection: getFlexDirection(row, reverse),
      flexWrap: wrap ? 'wrap' : 'nowrap',
      position: absolute ? 'absolute' : 'relative',
      zIndex,
      top,
      left,
      bottom,
      right,
      width,
      height,
      backgroundColor: background,
    },
    fill ? StyleSheet.absoluteFill : null,
    style,
  ];

  return <Comp ref={forwardedRef} style={finalStyle} {...props} />;
};
