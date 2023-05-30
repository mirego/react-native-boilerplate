import { ForwardedRef, forwardRef } from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Padding, PolymorphicComponentProps } from '../shared/types';
import { getPaddingStyle } from '../shared/utils';
import { GapContext, useGap } from './GapContext';
import { FlexGap } from './types';
import { getFlexDirection, getGapStyle } from './utils';

export type FlexProps<C extends React.ElementType> = PolymorphicComponentProps<
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
    basis?: string | number;
    wrap?: boolean;
    absolute?: boolean;
    zIndex?: number;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    width?: string | number;
    height?: string | number;
    fill?: boolean;
  }
>;

export type FlexComponent = <C extends React.ElementType = typeof View>(
  props: FlexProps<C>
) => React.ReactElement | null;

export const Flex = forwardRef(
  <C extends React.ElementType = typeof View>(
    {
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
      style,
      ...props
    }: FlexProps<C>,
    ref?: ForwardedRef<C>
  ) => {
    const Comp = as || View;
    const inheritedGap = useGap();
    const finalGap = typeof gap === 'number' ? gap : inheritedGap;
    const finalStyle: StyleProp<ViewStyle> = [
      getPaddingStyle(padding),
      getGapStyle(finalGap),
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
      },
      fill ? StyleSheet.absoluteFill : null,
      style,
    ];

    return (
      <GapContext.Provider value={finalGap}>
        <Comp ref={ref} style={finalStyle} {...props} />
      </GapContext.Provider>
    );
  }
);
