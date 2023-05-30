import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { FontFamily, FontWeight } from './types';
import {
  ColorSchemeValue,
  useColorSchemeValue,
} from '~/hooks/use-color-scheme-value';

export interface TextProps extends RNTextProps {
  family?: FontFamily;
  size?: number;
  italic?: boolean;
  weight?: FontWeight;
  lineHeight?: number;
  spacing?: number;
  color?: ColorSchemeValue<string>;
  centered?: boolean;
}

type TextComponent = ForwardRefExoticComponent<
  TextProps & RefAttributes<RNText>
>;

interface Text extends TextComponent {
  H1: TextComponent;
  H2: TextComponent;
  P: TextComponent;
}

function createVariant(defaultProps: TextProps) {
  return forwardRef<RNText, TextProps>((props, ref) => (
    <Text ref={ref} {...defaultProps} {...props} />
  ));
}

export const Text = forwardRef<RNText, TextProps>(
  (
    {
      family = 'Quicksand',
      size = 15,
      italic = false,
      weight = '400',
      lineHeight,
      color = ['#2F364F', '#F8F5F3'],
      centered = false,
      spacing = 0,
      style,
      ...props
    }: TextProps,
    ref
  ) => {
    const colorValue = useColorSchemeValue(color);
    const baseStyle: TextStyle = {
      // fontFamily: getFontFamily(family, weight, italic),
      fontSize: size,
      lineHeight,
      color: colorValue,
      textAlign: centered ? 'center' : 'auto',
      letterSpacing: spacing * size,
    };

    return <RNText ref={ref} style={[baseStyle, style]} {...props} />;
  }
) as Text;

Text.H1 = createVariant({
  family: 'Quicksand',
  size: 48,
  lineHeight: 53,
  spacing: -0.02,
  weight: '700',
});

Text.H2 = createVariant({
  family: 'Quicksand',
  size: 38,
  lineHeight: 42,
  spacing: -0.02,
  weight: '700',
});

Text.P = createVariant({
  family: 'CrimsonPro',
  size: 17,
  lineHeight: 19,
  weight: '400',
});
