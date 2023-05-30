import { useColorScheme } from 'react-native';

export type ColorSchemeValue<T> = [light: T, dark: T] | T;

export function useColorSchemeValue<T>(value: ColorSchemeValue<T>) {
  const colorScheme = useColorScheme();

  if (Array.isArray(value)) {
    const [light, dark] = value;
    return colorScheme === 'light' ? light : dark;
  }

  return value;
}
