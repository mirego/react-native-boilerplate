import { ForwardedRef, createRef, forwardRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Flex, FlexProps } from '../flex';
import { Padding } from '../shared/types';
import { Squishable } from '../squishable';
import {
  ColorSchemeValue,
  useColorSchemeValue,
} from '~/hooks/use-color-scheme-value';

export type CardProps<C extends React.ElementType> = FlexProps<C> & {
  outlined?: boolean;
  padding?: Padding;
  color?: ColorSchemeValue<string>;
  style?: StyleProp<ViewStyle>;
  radius?: number;
};

export type CardComponent = <C extends React.ElementType = typeof View>(
  props: CardProps<C>
) => React.ReactElement | null;

export const Card = forwardRef(
  <C extends React.ElementType = typeof View>(
    { outlined = false, color, style, radius = 32, ...props }: CardProps<C>,
    ref?: ForwardedRef<C>
  ) => {
    const backgroundColor = useColorSchemeValue(color ?? ['#fff', '#15171E']);
    const borderColor = useColorSchemeValue(color ?? ['#E8E3E0', '#434A60']);

    return (
      <Flex
        ref={ref}
        style={[
          {
            borderRadius: radius,
            backgroundColor: outlined ? 'transparent' : backgroundColor,
            borderColor: outlined ? borderColor : 'transparent',
            borderWidth: outlined ? 1 : 0,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

const ref = createRef<typeof Card>();
<Card ref={ref} as={Squishable} onPress={() => console.log('derp')} />;
