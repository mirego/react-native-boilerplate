import { Fonts } from './Fonts';
import { FontFamily, FontWeight } from './types';

export function getFontFamily(
  family: FontFamily,
  weight: FontWeight,
  italic: boolean
) {
  return italic ? Fonts[family].italic[weight] : Fonts[family].normal[weight];
}
