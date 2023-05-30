export type Padding =
  | number
  | [vertical: number, horizontal: number]
  | [top: number, horizontal: number, bottom: number]
  | [top: number, right: number, bottom: number, left: number];

export type Size = number | [number, number];

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];
