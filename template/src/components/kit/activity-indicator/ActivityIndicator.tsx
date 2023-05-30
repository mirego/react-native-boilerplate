import { Lottie } from '../lottie';
import loading from '~/lottie-animations/activity-indicator.json';
import {
  ColorSchemeValue,
  useColorSchemeValue,
} from '~/hooks/use-color-scheme-value';

export interface ActivityIndicatorProps {
  size: number;
  completed?: boolean;
  color?: ColorSchemeValue<string>;
}

const DEFAULT_COLOR: ColorSchemeValue<string> = ['#2F364F', '#F8F5F3'];

export function ActivityIndicator({
  size,
  color = DEFAULT_COLOR,
}: ActivityIndicatorProps) {
  const colorValue = useColorSchemeValue(color);

  return (
    <Lottie
      source={loading}
      autoPlay
      resizeMode="cover"
      style={{ width: size, height: size }}
      colorFilters={[{ keypath: 'spinner Outlines', color: colorValue }]}
    />
  );
}
