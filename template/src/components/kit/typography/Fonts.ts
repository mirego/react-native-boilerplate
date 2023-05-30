import { Font, FontFamily } from './types';

export const Fonts: Record<FontFamily, Font> = {
  Quicksand: {
    normal: {
      100: undefined,
      200: undefined,
      300: 'Quicksand-Light',
      400: 'Quicksand-Regular',
      500: 'Quicksand-Medium',
      600: 'Quicksand-SemiBold',
      700: 'Quicksand-Bold',
      800: undefined,
      900: undefined,
    },
    italic: {
      100: undefined,
      200: undefined,
      300: undefined,
      400: undefined,
      500: undefined,
      600: undefined,
      700: undefined,
      800: undefined,
      900: undefined,
    },
  },
  CrimsonPro: {
    normal: {
      100: undefined,
      200: 'CrimsonPro-ExtraLight',
      300: 'CrimsonPro-Light',
      400: 'CrimsonPro-Regular',
      500: 'CrimsonPro-Medium',
      600: 'CrimsonPro-Semibold',
      700: 'CrimsonPro-Bold',
      800: 'CrimsonPro-ExtraBold',
      900: 'CrimsonPro-Black',
    },
    italic: {
      100: undefined,
      200: 'CrimsonPro-ExtraLightItalic',
      300: 'CrimsonPro-LightItalic',
      400: 'CrimsonPro-RegularItalic',
      500: 'CrimsonPro-MediumItalic',
      600: 'CrimsonPro-SemiboldItalic',
      700: 'CrimsonPro-BoldItalic',
      800: 'CrimsonPro-ExtraBoldItalic',
      900: 'CrimsonPro-BlackItalic',
    },
  },
};
