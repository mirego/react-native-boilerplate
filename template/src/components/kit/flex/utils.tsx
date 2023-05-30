import { FlexStyle } from 'react-native';
import { FlexGap } from './types';

export function getGapStyle(gap?: FlexGap) {
  if (gap === undefined) {
    return { gap: 0 };
  }

  if (typeof gap === 'number') {
    return { gap };
  }

  const [rowGap, columnGap] = gap;
  return { rowGap, columnGap };
}

export function getFlexDirection(
  row: boolean,
  reverse: boolean
): FlexStyle['flexDirection'] {
  return `${row ? 'row' : 'column'}${reverse ? '-reverse' : ''}`;
}

export function getFlexGrowOrShrink(value: number | boolean) {
  if (typeof value === 'boolean') return value ? 1 : 0;
  return value;
}
