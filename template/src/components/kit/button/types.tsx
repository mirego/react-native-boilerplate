import { ViewStyle } from 'react-native';
import { ColorSchemeValue } from '~/hooks/use-color-scheme-value';

export type ButtonTheme = 'primary' | 'secondary' | 'outlined';
export type ButtonSize = 'large' | 'small' | 'tiny' | 'mini';
export type ButtonState = 'default' | 'pressed' | 'disabled';
export type ButtonStateStyles = Record<ButtonState, ViewStyle>;
export type ButtonStateColor = Record<ButtonState, ColorSchemeValue<string>>;
