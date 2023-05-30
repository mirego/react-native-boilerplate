import { ColorSchemeValue } from '@millie/hooks/use-color-scheme-value';
import { ViewStyle } from 'react-native';

export type ButtonTheme = 'primary' | 'secondary' | 'outlined';
export type ButtonSize = 'large' | 'small' | 'tiny' | 'mini';
export type ButtonState = 'default' | 'pressed' | 'disabled';
export type ButtonStateStyles = Record<ButtonState, ViewStyle>;
export type ButtonStateColor = Record<ButtonState, ColorSchemeValue<string>>;
