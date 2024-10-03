import { StyleProp, ViewStyle } from 'react-native';

export type Padding =
  | number
  | [vertical: number, horizontal: number]
  | [top: number, horizontal: number, bottom: number]
  | [top: number, right: number, bottom: number, left: number];

export type Radius =
  | number
  | [topLeftAndBottomRight: number, topRightAndBottomLeft: number]
  | [topLeft: number, topRightAndBottomLeft: number, bottomRight: number]
  | [
      topLeft: number,
      topRight: number,
      bottomRight: number,
      bottomLeft: number
    ];

export type Size = number | [number, number];

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type ForwardedRefProp<C extends React.ElementType> = {
  forwardedRef?: PolymorphicRef<C>;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends ComponentWithViewStyle<Props>,
  Props extends { style?: Style } = {},
  Style extends StyleProp<ViewStyle> = StyleProp<ViewStyle>
> = Props &
  AsProp<C> &
  ForwardedRefProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type ComponentWithViewStyle<
  Props extends { style?: Style } = {},
  Style extends StyleProp<ViewStyle> = StyleProp<ViewStyle>
> = React.JSXElementConstructor<Props>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];
